### Running the Python Backend
`python3 manage.py runserver`

### Running a Python Virtual Environment
If none of the `python` commands work, replace with `python3`.

If you have not created a virtual environment, begin by doing so in the app's
back-end directory (cd there): `$ python -m venv venv`

Once you have created your virtual environment, you can activate it by doing:
`$ source ./venv/bin/activate` (the activate may differ based on your shell. See
[here](https://docs.python.org/3/library/venv.html#how-venvs-work)).

Once you are in your virtual environment, you can install necessary requirements
from the `requirements.txt`. To do so, `$ pip install -r requirements.txt`.

