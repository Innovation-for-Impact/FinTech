import http.client
import json

# Constants
client_id = "65e7b7407aa8cf001cc59e7b"
secret = "6247f4912edd996835254c9e47bbf4"

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
    "identity"
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

# Retrieve Identity
identity = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "access_token": accessToken
})

conn.request("POST", "/identity/get", identity, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)

# Placeholder data for now until we get info from front end
phone_number = "+1-111-222-3333"
legal_name = "Alerta Charleson"
email_address = "accountholder1@example.com"
address_city = "San Matias"
address_country = "US"
address_postal_code = "93405"
address_region = "CA"
address_street = "2493 Leisure Ln."

print(data.decode("utf-8"))

# Match Identity
match = json.dumps({
  "client_id": client_id,
  "secret": secret,
  "access_token": accessToken,
  "user": {
    "phone_number": phone_number,
    "legal_name": legal_name,
    "email_address": email_address,
    "address": {
      "city": address_city,
      "country": address_country,
      "postal_code": address_postal_code,
      "region": address_region,
      "street": address_street
    }
  }
})

conn.request("POST", "/identity/match", match, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)

print(data.decode("utf-8"))