from server.models import Hardware, Channel, Content, Package

__author__ = 'Nem'

from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url',
                  'username',
                  'email',
                  'is_staff',
                  'groups'
                  )


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url',
                  'name'
                  )


class HardwareSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hardware
        # fields = ('url',
        # 'name',
        # 'home_url',
        # 'image_url',
        #           'version',
        #           'retail_cost',
        #           'mem_cost'
        #           )


class ChannelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Channel
        depth = 3
        # 4


class ContentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Content
        depth = 3
        # fields = ('url',
        # 'title',
        # 'description',
        # 'home_url',
        #           'image_url'
        #           )


class PackageDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Package
        fields = (
            'url',
            'content',
            'hardware',
            'providers'
        )
        depth = 2


class PackagesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Package
        fields = (
            'url',
            # 'owner',
            'data',
        )


class SignUpSerialzier(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        write_only_fields = ('password')
