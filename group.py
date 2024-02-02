from user import User
class Group:
    
    #Variables:
    group_name: str
    group_type: str
    group_ID: str
    owner_ID: str
    recovery_user_ID: str
    whitelist = []
    
    #Init:
    def init(self, name: str, group_type: str, ID: str, owner: str, recovery_user: str, current_balance = 0.0):
        self.group_name = name
        self.group_type = group_type
        self.group_ID = ID
        self.owner_ID = owner
        self.recovery_user_ID = recovery_user