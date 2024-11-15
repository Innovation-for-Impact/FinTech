from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import http.client
import json
from datetime import datetime, timedelta

def create_link_token(request):
    
  client_id = "65e7b7407aa8cf001cc59e7b6247f4912edd996835254c9e47bbf4"
  secret = "6247f4912edd996835254c9e47bbf4"

  conn = http.client.HTTPSConnection("sandbox.plaid.com")
  headers = {'Content-Type': 'application/json'}

  payload = json.dumps({
      "client_id": client_id,
      "secret": secret,
      "client_name": "InnoBank user",
      "country_codes": [
      "US"
      ],
      "language": "en",
      "user": {
      "client_user_id": "unique_user_id"
      },
      "products": [
      "auth"
      ]
    })

  conn.request("POST", "/link/token/create", payload, headers)
  res = conn.getresponse()
  data = res.read()

  link_token_response = json.loads(data.decode("utf-8"))
  link_token = link_token_response['link_token']
  return JsonResponse({'link_token': link_token})


def exchange_public_token(request):
    req_data = json.loads(request.body)
    public_token = req_data.get('public_token')

    if not public_token:
       return JsonResponse({'error': 'public_token is missing'}, status=400)


    conn = http.client.HTTPSConnection("sandbox.plaid.com")
    headers = {'Content-Type': 'application/json'}

    payload = json.dumps({
        "client_id": "65e7b7407aa8cf001cc59e7b6247f4912edd996835254c9e47bbf4",
        "secret": "6247f4912edd996835254c9e47bbf4",
        "public_token": public_token
    })

    conn.request("POST", "/item/public_token/exchange", payload, headers)
    res = conn.getresponse()
    data = res.read()

    exchange_response = json.loads(data.decode("utf-8"))
    access_token = exchange_response.get('access_token')

    if not access_token:
        return JsonResponse({'error': 'Failed to exchange public_token'}, status=401)

    request.session['access_token'] = access_token

    return JsonResponse({'access_token': access_token})


def get_transactions(request):
  access_token = request.session.get('access_token')
  if not access_token:
      return JsonResponse({'error': 'Access token is missing'}, status=401)


  start_date = (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')
  end_date = datetime.now().strftime('%Y-%m-%d')

    #connect to Plaid API
  conn = http.client.HTTPSConnection("sandbox.plaid.com")
  headers = {'Content-Type': 'application/json'}

  payload = json.dumps({
     "client_id": "65e7b7407aa8cf001cc59e7b6247f4912edd996835254c9e47bbf4",
      "secret": "6247f4912edd996835254c9e47bbf4",
      "access_token": access_token,
      "start_date": start_date,
      "end_date": end_date,
      "options": {
          "count": 10,
          "offset": 0
      }
  })

    #send request to Plaid
  conn.request("POST", "/transactions/get", payload, headers)
  res = conn.getresponse()
  data = res.read()

    #parse response
  transactions_response = json.loads(data.decode("utf-8"))
  transactions = transactions_response.get('transactions', [])

  return JsonResponse({'transactions': transactions})

