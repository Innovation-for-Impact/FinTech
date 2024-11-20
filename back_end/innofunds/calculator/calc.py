import json
from datetime import datetime

def list_accounts_by_subtype(data):
    """List accounts grouped by subtype for the user to choose from."""
    print("\nAvailable Account Subtypes:")
    subtypes = {}
    for account in data["accounts"]:
        # Normalize subtype for consistent keys
        subtype = account["subtype"].strip().lower().replace(" ", "_")
        if subtype not in subtypes:
            subtypes[subtype] = []
        subtypes[subtype].append(account)
    
    for idx, subtype in enumerate(subtypes.keys(), start=1):
        print(f"{idx}. {subtype.replace('_', ' ').capitalize()} ({len(subtypes[subtype])} account(s))")
    return subtypes


def choose_account_by_subtype(data):
    """Allow the user to select an account based on subtype."""
    subtypes = list_accounts_by_subtype(data)
    try:
        # Convert subtypes to a list for indexed selection
        subtype_list = list(subtypes.keys())
        
        # Prompt user to select a subtype by number
        choice = int(input("\nChoose a subtype by number: ")) - 1
        if 0 <= choice < len(subtype_list):
            selected_subtype = subtype_list[choice]
            account = subtypes[selected_subtype][0]  # Assume only one account per subtype
            
            # Display the user's choice
            available = account["balances"]["available"]
            available_display = f"${available:.2f}" if available is not None else "N/A"
            print(f"\nYou selected:")
            print(f"Subtype: {selected_subtype.replace('_', ' ').capitalize()}")
            print(f"Account: {account['name']} (Available: {available_display})")
            
            return account
        else:
            print("Invalid choice. Please enter a valid number.")
            return choose_account_by_subtype(data)
    except ValueError:
        print("Invalid input. Please enter a number.")
        return choose_account_by_subtype(data)
    except Exception as e:
        print(f"An unexpected error occurred: {e}. Please try again.")
        return choose_account_by_subtype(data)

def set_saving_goal(account):
    """Set a saving goal for a specific event."""
    try:
        target_amount = float(input("Enter the target amount needed for the event: $"))
        
        # Loop until a valid future date is entered
        while True:
            event_date_input = input("Enter the event date (MM-DD-YYYY): ")
            try:
                event_date = datetime.strptime(event_date_input, "%m-%d-%Y")
                if event_date > datetime.now():
                    break
                else:
                    print("Event date must be in the future. Try again.")
            except ValueError:
                print("Invalid date format. Please enter the date in MM-DD-YYYY format.")
        
        # Saving goal details
        saving_goal = {
            "account_id": account["account_id"],
            "subtype": account["subtype"],
            "target_amount": target_amount,
            "saved_amount": 0.0,
            "remaining_amount": target_amount,
            "event_date": event_date.strftime('%m-%d-%Y')
        }
        
        print(f"\nSaving goal set:")
        print(f"Target Amount: ${target_amount:.2f}")
        print(f"Event Date: {event_date.strftime('%m-%d-%Y')}")
        print(f"Account: {account['name']} ({account['subtype']})")
        
        return saving_goal
    except ValueError:
        print("Invalid input for the target amount. Please try again.")
        return set_saving_goal(account)


def save_to_file(file_path, data):
    """Save updated data to a file."""
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)
        print(f"Data saved to {file_path}.")

def main():
    try:
        # Load JSON data
        with open('chiho.json') as file:
            data = json.load(file)
        
        # Step 1: Choose an account by subtype
        account = choose_account_by_subtype(data)
        
        # Step 2: Set a saving goal for the event
        saving_goal = set_saving_goal(account)
        
        # Step 3: Save the saving goal back to the JSON file
        if "saving_goals" not in data:
            data["saving_goals"] = []
        data["saving_goals"].append(saving_goal)
        
        save_to_file('chiho_updated.json', data)
    except FileNotFoundError:
        print("The file 'chiho.json' was not found.")
    except json.JSONDecodeError:
        print("Error reading JSON data. Please check the file format.")

if __name__ == "__main__":
    main()