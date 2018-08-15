# GraphQL-Auth-Service

An Auth Service which includes facebook, google, and jwt strategy and Email verification with 6 digit code.


### How It Works

User either can sign up with email and password or with Oauth2 request. Important note here if facebook does not provide email 
address (most of the time it does not) user has been asked for to complate the registration by entering email address. If email 
address is providen by the Oauth2 request, service sign for he user jwt access and refresh token.

If user choose to sign by email and password, after filling the form user asked for email verification. 

## Setup

Setup is very simple, fill .env like .env.example file. Migrate database with npm run knex:migrate. It is ready to go.

Or you can use docker-compose file.  





