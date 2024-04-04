import http.client
import json

file = open("keys.txt")
keys = file.read().split()

client_id = keys[0]
secret = keys[1]

file.close()

conn = http.client.HTTPSConnection("sandbox.plaid.com")
headers = {
  'Content-Type': 'application/json'
}

# Create token
payload = json.dumps({
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
conn.request("POST", "/sandbox/public_token/create", payload, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)
publicToken = data_json["public_token"]

# Exchange token for key
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


payload = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "access_token": accessToken
})

conn.request("POST", "/auth/get", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))

