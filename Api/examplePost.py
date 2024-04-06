import http.client
import json


conn = http.client.HTTPSConnection("sandbox.plaid.com")
secretid = "silly"
clientid = "silly"

payload = json.dumps({
  "client_id": clientid,
  "secret": secretid,
  "institution_id": "ins_20",
  "initial_products": ["transactions"],
  "options": {"webhook": "https://www.genericwebhookurl.com/webhook"}
})
headers = {'Content-Type': 'application/json'}


conn.request("POST", "/sandbox/public_token/create", payload, headers)
res = conn.getresponse()
data = res.read().decode("utf-8")


data_json = json.loads(data)
if 'public_token' in data_json:
    pubtoken = data_json['public_token']

    
else:
    print("Error retrieving public token.")
    conn.close()
    exit()


payload1 = json.dumps({
  "client_id": clientid,
  "secret": secretid,
  "public_token": pubtoken
})

conn.request("POST", "/item/public_token/exchange", payload1, headers)
res = conn.getresponse()
data = res.read().decode("utf-8")

print(data)
