# Setup

### Install Python

**MacOS:**

```bash
$ brew install python@3.12
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
source env/bin/activate
```

**Note:** Activating may differ based on your shell. See
[docs](https://docs.python.org/3/library/venv.html#how-venvs-work).

**Install necessary packages:**

```bash
pip install -r requirements.txt
```

**Note:** This may take a while.

### Create Django Database

```bash
python3 manage.py makemigrations innofunds
python3 manage.py migrate
```

This looks for custom models defined in `/FinTech/back_end/innofunds/models.py` and imports them into the database

### Running the Python Backend

```bash
python3 manage.py runserver
```

The server is now hosted on [http://localhost:8000](http://localhost:8000). To change the port the server is specified on, you can do:

```bash
python3 manage.py runserver <IP:PORT> 
```

For example, `<IP:PORT>=0.0.0.0:8080`, runs the server at IP `0.0.0.0` and port `8080`.

**Deactivate the virtual environment:**

```bash
deactivate
```

**Note:** the virtual environment needs to be activated when running the backend server

### (Optional) Creating a Super User for Testing

An admin account is useful for debugging. To create one,

```bash
python3 manage.py createsuperuser
```

Creates an admin account. Follow the prompts and then go to `localhost:8000/admin/` and log in with the credentials.

# Development

Add Development instructions here...

## Testing

Testing is an important part of creating any piece of software, and Innofunds is no different. You will be **required** to write
test cases for the code that you write. To write test cases, you can take advantage of Django's built in testing suite.

Running tests. You can run tests with `$ python manage.py test`. For more advanced functionality, see
[here](https://docs.djangoproject.com/en/5.1/topics/testing/overview/#running-tests).

### Model and General Testing

For testing models and other general functions, see [this](https://docs.djangoproject.com/en/5.1/topics/testing/overview/) guide by Django.
You can also find some examples in the `tests.py` file, where these tests should be written.

### Django Rest Framework Testing

See this [guide](https://www.django-rest-framework.org/api-guide/testing/). API tests should, again, be written in `tests.py`.

Additional resource for examples [here](https://dev.to/alchermd/what-to-test-in-django-endpoints-357n)

### Django Endpoint Testing

For testing general purpose endpoints (that are not DRF), see
[this](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Testing#views) guide

### Development

Add Development instructions here

## API

### Admin Users: `/api/v1/admin/users`

Admin only. Supports all operations. **UNSTABLE: MAY CHANGE IN THE FUTURE**

### Limited User Info: `/api/v1/users`

A limit-offset paginated endpoint that returns info of up to 100 users at a time.

**Query Arguments**:
In addition to limit it and offset:

* `search`: allows users to be searched by first and last name

### Authentication: `api/v1/auth/...`

This is the authentication input. All specifications are [here](https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html) with some minor exceptions given below:

* `rest_auth` is replaced simply with `auth`.
* The application just uses email, **NOT** usernames.
* Registration takes in `first_name` and `last_name`.
* There is a password reset confirmation URL (that **isn't** specified in the linked specification) that will server a *static* HTML page provided by the backend. I.e. the frontend need not do anything with this endpoint.

### Add any additional endpoints here

### Friends: `api/v1/users/<id>/friends`

Allows access and modification of user `id`'s friends.

Supports the following methods: `GET` `POST` `DELETE`

`GET`: gets a user's friends. Supports the following query string arguments:

* `limit`: the maximum number of friends to return. Defaults to 50, and can be at most 100
* `offset`: offsets the user's returned so users outside the limit can be retrieved. Defaults to 0.
* `type`: an integer value for the type of friend request to retrieve. Defaults to 3. There are 4 valid types:

  * `0`: unknown friendship
  * `1`: friend requests where user `id` sent the friend request
  * `2`: friend requests where the user `id` received a friend request
  * `3`: users that user `id` is friends with
* `id`: a boolean value where, if true, returns the ids of the user's friends rather than friend objects.
Defaults to `False`.

`POST`: allows the creation of friend requests
**Body:**

* `recipient_id` for the ID of the user the friend request is being sent to from user `id` **(required)**

**Behavior:**

A proper friendship (i.e. a friendship of type 3) will be created between two users when the user
that received the friend request creates a friend request to the other user (i.e. accepts the
friend request). So, to create a friendship, two post requests from this endpoint must sent
for each user involved in the friendship.

`DELETE`:

Deletes any relationship between two users.

**Body:**

* `recipient_id` the ID of the user to delete the relationship with

### Add any additional endpoints here

> Add all API endpoints and their specifications here

## Conclusion

If anything about this document is unclear, please make an issue on Github or bring it up in the Slack.
