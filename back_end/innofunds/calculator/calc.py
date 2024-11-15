import json

with open('chiho.json') as file:
    data = json.load(file)

total_available = 0

for account in data["accounts"]:
    available_balance = account["balances"].get("available")
    if available_balance is not None:
        total_available += available_balance

print(f"Total available balance: ${total_available:.2f}")