import json
from datetime import datetime

def set_budget_and_start_date():
    try:
        budget = float(input("Enter your total budget amount: $"))
        print(f"Your budget has been set to: ${budget:.2f}")

        start_date_input = input("Enter the start date (MM-DD-YYYY): ")
        start_date = datetime.strptime(start_date_input, "%m-%d-%Y")

        print(f"Your budget tracking will start from: {start_date.strftime('%m-%d-%Y')}")
        
        return budget, start_date
    except ValueError:
        print("Invalid input. Please enter a valid budget amount and date in MM-DD-YYYY format.")
        return None, None

def calculate_total_available_balance():
    try:
        with open('chiho.json') as file:
            data = json.load(file)

        total_available = 0
        for account in data["accounts"]:
            available_balance = account["balances"].get("available")
            if available_balance is not None:
                total_available += available_balance

        print(f"Total available balance across accounts: ${total_available:.2f}")
        return total_available
    except FileNotFoundError:
        print("The file 'chiho.json' was not found.")
        return 0
    except json.JSONDecodeError:
        print("Error reading JSON data. Please check the file format.")
        return 0

budget, start_date = set_budget_and_start_date()
if budget and start_date:
    total_available_balance = calculate_total_available_balance()
    
    print(f"Budget set to ${budget:.2f} starting from {start_date.strftime('%m-%d-%Y')}")
    print(f"Total available balance from JSON data: ${total_available_balance:.2f}")
else:
    print("Failed to set budget and start date.")