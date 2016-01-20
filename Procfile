web: gunicorn cutthecord.wsgi --log-file -
worker: ./manage.py rqworker high default low
migrate: ./manage.py migrate
static: ./manage.py collectstatic --clear --noinput