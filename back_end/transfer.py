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
print(data.decode("utf-8"))

data_json = json.loads(data)

# Error checking
if('error_code' in data_json):
    sys.exit(data_json['error_message'])

if(data_json['authorization']['decision'] == 'declined'):
    sys.exit(data_json['authorization']['decision_rationale']["description"])

# Save the transfer id
transferID = data_json['authorization']['id']
print(transferID)

