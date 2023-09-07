# OpenMusic-API

## Description
This is a simple API created using NodeJS as a collection of assignments Dicoding - Learning Fundamentals of Back-End Applications. Users can add songs, create playlists, include songs in playlists, and share playlists with other users.

## Technology Used

- NodeJS

## Tools Used
- RabbitMQ
- Redis
- Hapi

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/shdiqq/OpenMusic-API.git
```

Change into the project directory:

```bash
cd OpenMusic-API
```

Install the necessary dependencies:

```bash
npm install
```

Create a .env file and add your database configuration:
- **HOST**: Host to be used by your application.
- **PORT**: Port to be used by your application.
- **PGUSER**: Your base data username.
- **PGPASSWORD**: Your basic data password.
- **PGDATABASE**: Database name to be used by your application.
- **PGHOST**: Your host base data (eg: `localhost` or IP address).
- **PGPORT**: The port used by your database (eg: `3306` for MySQL).
- **SALT_ROUNDS**= The number of rounds used in the hashing algorithm. This is part of password security.
- **ACCESS_TOKEN_KEY**: The secret key used to generate and validate the JWT access token.
- **REFRESH_TOKEN_KEY**: The secret key used to generate and validate the JWT access token.
- **ACCESS_TOKEN_AGE**: The duration of the access token in seconds.
- **RABBITMQ_SERVER**: RabbitMQ host server value
- **REDIS_SERVER**: Redis host server value

Make sure to populate these values with information appropriate to your development environment. All these configurations are very important to run the application properly.

Example `.env`:

```env
HOST=localhost
PORT=5432
PGUSER=my_username
PGPASSWORD=my_password
PGDATABASE=my_db_name
PGHOST=localhost
PGPORT=3306
SALT_ROUNDS=10
ACCESS_TOKEN_KEY=abcde
REFRESH_TOKEN_KEY=abcde
ACCESS_TOKEN_AGE=180
RABBITMQ_SERVER=amqp://localhost
REDIS_SERVER=127.0.0.1
```

Run the project:

```bash
npm run dev
```
