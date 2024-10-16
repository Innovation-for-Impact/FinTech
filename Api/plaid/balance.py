import http.client
import json

# Constants
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
createToken = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "institution_id": "ins_20",
  "initial_products": [
    "auth"
  ],
  "options": {
    "webhook": "https://www.genericwebhookurl.com/webhook"
  }
})

conn.request("POST", "/sandbox/public_token/create", createToken, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)

publicToken = data_json['public_token']
print(data.decode("utf-8"))

# Exchange the token
exchangeToken = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "public_token": publicToken
})
conn.request("POST", "/item/public_token/exchange", exchangeToken, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)
accessToken = data_json['access_token']
print(data.decode("utf-8"))

# Retrieve the balance
balance = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "access_token": accessToken,
})
conn.request("POST", "/accounts/balance/get", balance, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)
print('\n')

for elt in data_json['accounts']:
    if(elt['subtype'] == "savings"):
        print(elt)

#print(data.decode("utf-8"))
