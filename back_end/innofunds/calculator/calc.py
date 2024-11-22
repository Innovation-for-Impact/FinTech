import json
from datetime import datetime

def list_accounts_by_subtype(data):
    """List accounts grouped by subtype."""
    subtypes = {}
    for account in data["accounts"]:
        # Normalize subtype for consistent keys
        subtype = account["subtype"].strip().lower().replace(" ", "_")
        if subtype not in subtypes:
            subtypes[subtype] = []
        subtypes[subtype].append(account)
    
    subtype_list = [
        {"name": subtype.replace("_", " ").capitalize(), "count": len(accounts)}
        for subtype, accounts in subtypes.items()
    ]
    return {"subtypes": subtypes, "subtype_list": subtype_list}


def choose_account_by_subtype(data, subtype_choice):
    """Select an account based on the chosen subtype."""
    subtypes_data = list_accounts_by_subtype(data)
    subtypes = subtypes_data["subtypes"]
    subtype_keys = list(subtypes.keys())
    
    if 0 <= subtype_choice < len(subtype_keys):
        selected_subtype = subtype_keys[subtype_choice]
        account = subtypes[selected_subtype][0]  # Select the first account in the chosen subtype
        
        # Return account details
        return account
    else:
        raise ValueError("Invalid subtype choice.")


def calculate_budget_split(target_amount, event_date, split_choice):
    """Calculate the budget split based on user preference."""
    today = datetime.now()
    if split_choice == "months":
        # Split by months
        num_splits = (event_date.year - today.year) * 12 + (event_date.month - today.month)
        period = "months"
    elif split_choice == "weeks":
        # Split by weeks
        num_splits = (event_date - today).days // 7
        period = "weeks"
    elif split_choice == "days":
        # Split by days
        num_splits = (event_date - today).days
        period = "days"
    else:
        raise ValueError("Invalid split choice.")
    
    if num_splits <= 0:
        raise ValueError("Event date must be in the future.")
    
    amount_per_split = target_amount / num_splits
    
    return {
        "split_period": period,
        "num_splits": num_splits,
        "amount_per_split": round(amount_per_split, 2)
    }


def set_saving_goal(account, target_amount, event_date_input, split_choice):
    """Set a saving goal for a specific event."""
    event_date = datetime.strptime(event_date_input, "%m-%d-%Y")
    if event_date <= datetime.now():
        raise ValueError("Event date must be in the future.")
    
    split_details = calculate_budget_split(target_amount, event_date, split_choice)
    
    saving_goal = {
        "account_id": account["account_id"],
        "subtype": account["subtype"],
        "target_amount": target_amount,
        "saved_amount": 0.0,
        "remaining_amount": target_amount,
        "event_date": event_date.strftime('%m-%d-%Y'),
        "split_details": split_details
    }
    
    return saving_goal


def save_to_file(file_path, saving_goals):
    """Save saving goals to a file."""
    with open(file_path, 'w') as file:
        json.dump({"saving_goals": saving_goals}, file, indent=4)
        print(f"Data saved to {file_path}.")


# Example Function for Backend Workflow
# data = json file, subtype_choice = integer, target_amount = float, event_date_input = string, split_choice = string
def calculator(data, subtype_choice, target_amount, event_date_input, split_choice):
    # Step 1: Select an account based on the chosen subtype
    account = choose_account_by_subtype(data, subtype_choice)
    
    # Step 2: Set a saving goal
    saving_goal = set_saving_goal(account, target_amount, event_date_input, split_choice)
    
    # Step 3: Save the saving goal
    if "saving_goals" not in data:
        data["saving_goals"] = []
    data["saving_goals"].append(saving_goal)
    
    save_to_file('saving_goals.json', data["saving_goals"])
    
    return saving_goal

def transaction(account, subtype, amount_change, date):
    """Record a transaction for an account."""
    # check the subtype is correct
    # check the date is not before the event
    # change the saved_amount, remain_amount
    transaction = {
        "account_id": account["account_id"],
        "subtype": subtype,
        "amount_change": amount_change,
        "date": date
    }
    return transaction