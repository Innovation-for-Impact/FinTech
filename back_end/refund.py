import http.client
import json

conn = http.client.HTTPSConnection("sandbox.plaid.com")
payload = json.dumps({
  "client_id": "silly",
  "secret": "silly",
  "transfer_id": NEED_TO_CHANGE -->"aabf3890-6143-b3e2-c61b-b6ca7141f648",
  "amount": "0.50",
  "idempotency_key": "VEK2ea3X6LKywsc8J6pg"
})
headers = {
  'Content-Type': 'application/json'
}
conn.request("POST", "/transfer/refund/create", payload, headers)
res = conn.getresponse()
data = res.read()

data_json = json.loads(data)
refund_id = data_json['refund']['id']
print("Refund ID:", refund_id)


payload2 = json.dumps({
  "client_id": "silly",
  "secret": "silly",
  "refund_id": refund_id
})

conn.request("POST", "/transfer/refund/get", payload2, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))
