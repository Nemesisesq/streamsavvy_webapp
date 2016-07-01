import logging
import os
from django.shortcuts import redirect

__author__ = 'Nem'


class BlockLiveSiteFromNonAdminUsers(object):

    logger = logging.getLogger('cutthecord')

    def process_request(self, request):

        # os.environ['ENVIRONMENT']= 'production'
        re = request
        # self.logger.debug('Checking environment {} for user {}'.format(os.getenv('Environment'), re.user))
        if os.getenv('ENVIRONMENT') == 'production' and os.getenv('REQUIRE_AUTH'):
            if request.user.is_staff or request.user.is_authenticated or request.path_info.startswith('/admin/'):
                return None

            elif request.path_info.startswith('/beta/'):
                return None

            else:
                return redirect('http://www.streamsavvy.tv')

        else:
            return None
