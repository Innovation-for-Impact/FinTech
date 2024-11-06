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
$ python3 manage.py makemigrations
$ python3 manage.py migrate
```

### Running the Python Backend
```bash
$ python3 manage.py runserver
```
The server is now hosted on [http://localhost:8000](http://localhost:8000)

**Deactivate the virtual environment:**
```bash
$ deactivate
```
**Note:** the virtual environment needs to be activated when running the backend server

### Development
Add Development instructions here

## API
`/api/v1/users` - Functionality

Add all API endpoints and their specifications here