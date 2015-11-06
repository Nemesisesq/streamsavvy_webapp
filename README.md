# streamsavvy_webapp
this is a repository that houses both the front end angular and the back end python applications


#Instructions for running the server

## Entering the virtual environment

- $: workon streamsavvy
- $: cd streamsavvy_webapp

### redis environment variable

redis is our cache store that speeds up the site

- $:redis-server

### set redis environment variable

- $: export REDISCLOUD_URL=redis://localhost:6379
- make sure that you export your environment variables in the same terminal instance as ./manage.py runserver.

## Running Gulp

In order for us to have our changes reflected in the application the first thing we do is run gulp

- $: gulp

## Runserver

- $: ./manage.py runserver

- don't forget to migrate ./manage.py migrate
