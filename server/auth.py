import time
import jwt
from django.contrib.auth.models import User
from django.forms import model_to_dict
from django.http import JsonResponse
from rest_framework import authentication, exceptions

from django.conf import settings

__author__ = 'Nem'
from django.contrib.auth import authenticate, login
from server.shortcuts import api_json_post

current_milli_time = lambda: int(round(time.time() * 1000))


@api_json_post
def login_view(request, the_json):
    username = the_json['username']
    password = the_json['password']

    user = authenticate(username=username, password=password)

    if user is not None:
        if user.is_active:
            login(request, user)

            return JsonResponse({'success': 'Welcome {user}'.format(user=user.first_name),
                                 'messages': [
                                     {"text": "Logged In Successfully Welcome {user}".format(user=user.first_name),
                                      "severity": "success"}
                                 ]})
        else:
            return JsonResponse({'error': 'there seemes to be a problem with your username or password'})
    else:
        return JsonResponse({'error': 'this user does not exsist'})


def create_jwt(the_json):
    username = the_json['username']
    password = the_json['password']

    user = authenticate(username=username, password=password)

    user_dict = model_to_dict(user,
                              fields=['created', 'email', 'username', 'password'])

    payload = user_dict


    time = current_milli_time()
    payload['token_created'] = time

    secret_key = getattr(settings, "SECRET_KEY")

    token = jwt.encode(payload, secret_key , algorithm='HS256').decode('utf-8')

    return token


def get_user(token):
    payload = decode_token(token)

    try:
        u = User.objects.get(username=payload['username'], password=payload['password'])
    except Exception as e:
        raise e

    return u



def check_token(token):
    payload = decode_token(token)

    try:
        u = User.objects.get(username=payload['username'], password=payload['password'])
    except Exception as e:
        return False

    if (current_milli_time - payload['token_created']) > 7776000000:
        return False

    return True


def decode_token(token):
    payload = jwt.decode(token, settings['SECRET_KEY'], algorithm='HS256')
    return payload


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):

        token = request.META.get('Authentication').replace('Bearer_', '')

        if not token:
            return None


        # TODO some duplication in here but it's acceptable.


        try:
            if check_token(token):
                return None
        except Exception as e:
            raise exceptions.AuthenticationFailed('No such user')

        user = get_user(token)

        return user

