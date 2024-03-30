import http.client
import json

# Constants
client_id = "secret"
secret = "other_secret"

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
print(data.decode("utf-8"))

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
print(data.decode("utf-8"))

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
account_number = "123456789"
routing_number = "987654321"

print(data.decode("utf-8"))
