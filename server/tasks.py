import json

import django_rq

from server.apis.guidebox import GuideBox


def inital_database_population_of_content():
    g = GuideBox()
    q = django_rq.get_queue('low')
    result = []

    total_shows = g.get_total_number_of_shows()

    for i in range(0,total_shows, 250):
        show_list = g.get_content_list(i)
        shows_dict = json.loads(show_list)

        for show in shows_dict['results']:
            q.enqueue(g.save_content, show)

            result.append(show)

    return result

