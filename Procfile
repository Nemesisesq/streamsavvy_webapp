web: gunicorn streamsavvy_webapp.wsgi --log-file -
worker: ./manage.py rqworker high default low
migrate: ./manage.py migrate
