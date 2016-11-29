import pandas as pd
import time
import redis
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import logging
from server.models import Content

logger = logging.getLogger('cutthecord')


class ContentEngine(object):
    SIMKEY = 'p:smlr:{}'

    def __init__(self):
        self._r = redis.StrictRedis.from_url('redis://localhost:6379')


    def train(self):
        start = time.time()
        v = [x["guidebox_data"] for x in Content.objects.all().values() if x]
        v = [x for x in v if x]
        v = [x for x in v if 'detail' in x]


        ds = pd.DataFrame(v)
        # print(ds)
        logger.info("Training data injested in %s seconds" % (time.time() - start))

        self._r.flushdb()

        start = time.time()
        self._train(ds)
        logger.info("Engine trained in %s seconds" % (time.time() - start))

    def _train(self, ds):
        pass

        """
        Train the engine.

        Create a TF-IDF matrix of unigrams, bigrams, and trigrams
        for each product. The 'stop_words' param tells the TF-IDF
        module to ignore common english words like 'the', etc.

        Then we compute similarity between all products using
        SciKit Leanr's linear_kernel (which in this case is
        equivalent to cosine similarity).

        Iterate through each item's similar items and store the
        100 most-similar. Stops at 100 because well...  how many
        similar products do you really need to show?

        Similarities and their scores are stored in redis as a
        Sorted Set, with one set for each item.

        :param ds: A pandas dataset containing two fields: description & id
        :return: Nothin!
        """

        tf = TfidfVectorizer(analyzer='word',
                             ngram_range=(1,3),
                             min_df=0,
                             stop_words='english')

        """
        The dataset for the content needs to be split up in to
        """
        genres = []
        for x in ds.detail:
            self.genre_dict_to_string(genres, x)


        ds.genres = pd.Series(genres)


        tfid_matrix = tf.fit_transform(ds.genres)

        cosine_similarities = linear_kernel(tfid_matrix, tfid_matrix)

        for idx, row in ds.iterrows():
            # print(idx, row['title'])
            self.process_dataset_row(cosine_similarities, ds, idx, row)

    def process_dataset_row(self, cosine_similarities, ds, idx, row):
        similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
        smilar_items = [(cosine_similarities[idx][i], ds['id'][i]) for i in similar_indices]
        flattened = sum(smilar_items[1:], ())
        self._r.zadd(self.SIMKEY.format(row['id']), *flattened)

    def genre_dict_to_string(self, genres, x):
        y = []
        if 'genres' in x:

            for c in x['genres']:
                y.append(c['title'])
            genres.append(" ".join(y))
        else:
            genres.append("random")

    def predict(self, item_id, num):
        """
        Couldn't be simpler! Just retrieves the similar items and
        their 'score' from redis.

        :param item_id: string
        :param num: number of similar items to return
        :return: A list of lists like: [["19", 0.2203],
        ["494", 0.1693], ...]. The first item in each sub-list is
        the item ID and the second is the similarity score. Sorted
        by similarity score, descending.
        """

        return self._r.zrange(self.SIMKEY.format(item_id),
                              0,
                              num - 1,
                              withscores=True,
                              desc=True)




# content_engine = ContentEngine()

