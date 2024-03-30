import http.client
import json

# Constants
client_id = "65e7b7407aa8cf001cc59e7b"
secret = "6247f4912edd996835254c9e47bbf4"

conn = http.client.HTTPSConnection("sandbox.plaid.com")
headers = {
  'Content-Type': 'application/json'
}

# Create Auth public token
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
#print(data.decode("utf-8"))

# Exchange public token for access token
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
#print(data.decode("utf-8"))

# Retrieve Auth data (account + routing number)
auth = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "access_token": accessToken
})

conn.request("POST", "/auth/get", auth, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)

# Placeholder data for now until we get info from front end
account_number = data_json['numbers']['ach'][0]['account']
routing_number = data_json['numbers']['ach'][0]['routing']

print(account_number)
