# Setup
### Install Python
**MacOS:**
```bash
$ brew install python
$ python3 --version
3.12.3
```
**Linux:**
```bash
$ sudo apt update
$ sudo apt install python3
$ python3 --version
3.12.3
```


### Running a Python Virtual Environment
If none of the `python` commands work, replace with `python3`.

**Create the Python virtual environment:**
Make sure you are in the backend folder when you creat the virtual environment.
```bash
$ pwd
/FinTech/back_end
$ python3 -m venv env/
```

**Activate virtual environment:**
```bash
$ source env/bin/activate
```
**Note:** Activating may differ based on your shell. See
[docs](https://docs.python.org/3/library/venv.html#how-venvs-work).


**Install necessary packages:**
```bash
$ pip install -r requirements.txt
```
**Note:** This may take a while.

### Create Django Database
```bash
$ python3 manage.py makemigrations innofunds
$ python3 manage.py migrate
```
This looks for custom models defined in `/FinTech/back_end/innofunds/models.py` and imports them into the database

### Running the Python Backend
```bash
$ python3 manage.py runserver
```
The server is now hosted on [http://localhost:8000](http://localhost:8000). To change the port the server is specified on, you can do:
```bash
$ python3 manage.py runserver <IP:PORT> 
```
For example, `<IP:PORT>=0.0.0.0:8080`, runs the server at IP `0.0.0.0` and port `8080`.

**Deactivate the virtual environment:**
```bash
$ deactivate
```
**Note:** the virtual environment needs to be activated when running the backend server

### (Optional) Creating a Super User for Testing
An admin account is useful for debugging. To create one,
```bash
$ python3 manage.py createsuperuser
```
Creates an admin account. Follow the prompts and then go to `localhost:8000/admin/` and log in with the credentials.

### Development
Add Development instructions here

## API
### Users: `/api/v1/users`
A **GET** request returns information about a user. If the user is an admin, it returns all suer data

### Authentication: `api/v1/auth/...`
This is the authentication input. All specifications are [here](https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html) with some minor exceptions given below:
* `rest_auth` is replaced simply with `auth`.
* The application just uses email, **NOT** usernames.
* Registration takes in `first_name` and `last_name`.
* There is a password reset confirmation URL (that **isn't** specified in the linked specification) that will server a *static* HTML page provided by the backend. I.e. the frontend need not do anything with this endpoint.

### Add any additional endpoints here...

> Add all API endpoints and their specifications here

## Conclusion
If anything about this document is unclear, please make an issue on Github or bring it up in the Slack.