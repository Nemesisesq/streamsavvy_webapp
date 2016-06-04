__author__ = 'Nem'

from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAuthenticated


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):

        return obj.owner == request.user


class IsAdminOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True

        user = request.user
        return user.is_staff


class IsAuthenticatedOrCreate(IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return super(IsAuthenticatedOrCreate, self).has_permission(request, view)