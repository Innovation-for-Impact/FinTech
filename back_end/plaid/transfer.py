import http.client
import json
import sys

file = open("keys.txt")
keys = file.read().split()

client_id = keys[0]
secret = keys[1]

file.close()

conn = http.client.HTTPSConnection("sandbox.plaid.com")
headers = {
  'Content-Type': 'application/json'
}

# Create the token
payload = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "institution_id": "ins_19",
  "initial_products": [
    "transfer"
  ],
  "options": {
    "webhook": "https://www.genericwebhookurl.com/webhook"
  }
})
conn.request("POST", "/sandbox/public_token/create", payload, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)
publicToken = data_json["public_token"]

# Exchange the token for access token
payload = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "public_token": publicToken
})
conn.request("POST", "/item/public_token/exchange", payload, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)
accessToken = data_json["access_token"]

# Retrieve account info
payload = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "access_token": accessToken
})
conn.request("POST", "/accounts/get", payload, headers)
res = conn.getresponse()
data = res.read()

# Pull a debit account
data_json = json.loads(data)

account = {}
for elt in data_json["accounts"]:
    if elt['subtype'] == 'checking':
        account = elt
        break

if account == {}:
    print("error lol")

#print(account)

# Get the balance of this account
denomination = account["balances"]["iso_currency_code"]
accountID = account["account_id"]
balance = account["balances"]["available"]
print("This account has", denomination, balance, "available.")

# Authorize a transfer
payload = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "access_token": accessToken,
  "account_id": accountID,
  "type": "debit", # A debit indicates a transfer of money into the origination account; a credit indicates a transfer of money out of the origination account.
  # ^^ idk what this means, should this be credit to send out of account?
  "network": "ach",
  "ach_class": "ppd",
  "amount": "100.00",
  "user": {
    "legal_name": "Anna Charleston"
  }
})
headers = {
  'Content-Type': 'application/json'
}
conn.request("POST", "/transfer/authorization/create", payload, headers)
res = conn.getresponse()
data = res.read()
# print(data.decode("utf-8"))

data_json = json.loads(data)

# Error checking
if('error_code' in data_json):
    sys.exit(data_json['error_message'])

if(data_json['authorization']['decision'] == 'declined'):
    sys.exit(data_json['authorization']['decision_rationale']["description"])

print("Sucessfully authorized transfer")

authorizationID = data_json['authorization']['id']

# Initiate the transfer
payload = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "access_token": accessToken,
  "account_id": accountID,
  "authorization_id": authorizationID,
  "description": "test"
})
conn.request("POST", "/transfer/create", payload, headers)
res = conn.getresponse()
data = res.read()
# print(data.decode("utf-8"))

data_json = json.loads(data)

# Save the transfer id
transferID = data_json['transfer']['id']
transferAmount = data_json['transfer']['amount']
print("transfer id", transferID)
print("transfer amount", transferAmount)

# Get the transfer

payload = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "transfer_id": transferID
})
conn.request("POST", "/transfer/get", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))


# Cancel a transfer
cancelTransfer = True # Get this from front end!
if(cancelTransfer):

    # Only works when transfer.cancelleable is true? Do we need to check if it is false?
    payload = json.dumps({
    "client_id": "65e7b7407aa8cf001cc59e7b",
    "secret": "6247f4912edd996835254c9e47bbf4",
    "transfer_id": transferID
    })
    conn.request("POST", "/transfer/cancel", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print("Transfer Cancelled.")


# # Refund stuff
# payload = json.dumps({
#   "client_id": client_id,
#   "secret": secret,
#   "transfer_id": transferID,
#   "amount": "0.50",
#   "idempotency_key": authorizationID
# })

# conn.request("POST", "/transfer/refund/create", payload, headers)
# res = conn.getresponse()
# data = res.read()
# print(data.decode("utf-8"))

# data_json = json.loads(data)
# refund_id = data_json['refund']['id']
# print("Refund ID:", refund_id)


# payload2 = json.dumps({
#   "client_id": client_id,
#   "secret": secret,
#   "refund_id": refund_id
# })

# conn.request("POST", "/transfer/refund/get", payload2, headers)
# res = conn.getresponse()
# data = res.read()
# print(data.decode("utf-8"))

