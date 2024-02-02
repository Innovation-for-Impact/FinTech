
class User:
    """User class"""
    
    #Variables:
    phone_number: int
    current_balance: int
    email: str
    password: str
    first_name: str
    last_name: str
    last_four_digits = 'null'
    phone_number[-4:]
    
    #Init:
    def __init__(self, first_name, last_name,  ID: str, email, phone_number, password, current_balance = 0.0):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone_number = phone_number
        self.password = password
        self.current_balance = current_balance
        # take 4 digits of phone number string and store for 2FA
        self.last_four_digits = phone_number[-4:]
    