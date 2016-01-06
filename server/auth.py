from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import redirect

from server.models import Package

__author__ = 'Nem'
from django.contrib.auth import authenticate, login
from server.shortcuts import api_json_post

@api_json_post
def login_view(request, the_json):
    username = the_json['username']
    password = the_json['password']

    user = authenticate(username=username, password=password)

    if user is not None:
        if user.is_active:
            login(request, user)

            return redirect('/')
            # return JsonResponse({'success':'Welcome {user}'.format(user=user.first_name),
            #                      'messages': [
            #                          {"text":"Logged In Successfully Welcome {user}".format(user=user.first_name),
            #                           "severity": "success"}
            #                      ]})
        else:
            return JsonResponse({'error': 'there seemes to be a problem with your username or password'})
    else:
        return JsonResponse({'error':'this user does not exsist'})


def clean_username(username):
    try:
        User.objects.get(username=username)
    except User.DoesNotExist:
        return True
    return False


def clean_email(email):
    try:
        User.objects.get(email=email)
    except User.DoesNotExist:
        return True
    return False


@api_json_post
def register_user(request, the_json):
    if not clean_username(the_json['username']):
        return JsonResponse({'error': 'this user name is not available'})

    if not clean_email(the_json['email']):
        return JsonResponse({'error': 'a user with the email already exists'})

    new_user = User(username=the_json['username'],
                password=the_json['password'],
                email=the_json['email'],
                first_name=the_json['first_name'],
                last_name=the_json['last_name'])

    new_user.packages.add(Package.objects.create())

    new_user.save()



    response = {
        'username': new_user.username,
        'name': new_user.get_full_name()
    }

    return JsonResponse(response, safe=False)

