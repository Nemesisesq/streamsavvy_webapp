import logging
import os
from django.shortcuts import redirect

__author__ = 'Nem'


class BlockLiveSiteFromNonAdminUsers(object):

    logger = logging.getLogger('cutthecord')

    def process_request(self, request):

        # os.environ['ENVIRONMENT']= 'production'
        re = request
        self.logger.debug('Checking environment {} for user {}'.format(os.getenv('Environment'), re.user))
        if os.getenv('ENVIRONMENT') == 'production':
            if request.user.is_staff or request.path_info.startswith('/admin/'):
                return None

            else:
                return redirect('http://www.streamsavvy.tv')

        else:
            return None
