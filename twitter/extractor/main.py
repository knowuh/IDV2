import os
import simplejson as json
os.environ["AWS_PROFILE"] = "idv2"
from extractor.query import Query
from extractor.by_hour_query import ByHourQuery, parseTime
from extractor.limited_fields import LimitedFields
from extractor.sentiment_plugin import SentimentPlugin
from extractor.place_plugin import PlacePlugin
from extractor.label_image import LabelImage
from extractor.category_plugin import CategoryPlugin
from collections import Counter
from utils.utils import parseTime
import time

def save(term, results):
    filename = "../sample/%(search_term)s.json" % {"search_term": term}
    with open(filename, 'w') as outfile:
        json.dump(results, outfile, indent=4, sort_keys=True)


def foodporn():
    search_term = "#foodporn"
    query = Query(search_term, limit=400, qFilter=Query.ImageFitler, plugins=[SentimentPlugin()])
    save(search_term, query.get_results())

def panama():
    search_term = "panama papers"
    fields = {
        'x': 'x',
        'y': 'y',
        'country_code': 'country_code',
        'city': 'city',
        'text': 'text',
        'lang': 'lang',
        'screen_name': 'screen_name',
        'timestamp': 'timestamp',
        'created_at': 'created_at'
    }

    query = Query(
        tag=search_term,
        limit=4000,
        qFilter=Query.PlaceFilter,
        plugins=[PlacePlugin(), LimitedFields(fields)])
    tweets = query.get_results()
    save(search_term, tweets)


def zika():
    search_term = "#zika"
    fields = {
        'x': 'x',
        'y': 'y',
        'country_code': 'country_code',
        'city': 'city',
        'text': 'text',
        'lang': 'lang',
        'screen_name': 'screen_name',
        'timestamp': 'timestamp',
        'created_at': 'created_at'
    }
    now = int(time.time())
    start_time = parseTime("2016-02-01")
    one_hour = 60 * 60
    tweets = []
    binned_tweets = []
    while start_time < now:
        start_time += one_hour
        query = Query(
            tag=search_term,
            start_s=start_time,
            duration_s= 60 * 20,
            limit=200,
            qFilter=Query.PlaceFilter,
            plugins=[PlacePlugin(), LimitedFields(fields)])
        new = query.get_results()
        tweets = tweets + new
        binned_tweets.append({'count': len(new), 'start_time': start_time, 'tweets': new})
        print len(new)
        if len(tweets) > 0:
            first = tweets[0]
            last  = tweets[-1]
            print "first: %(first)s, last: %(last)s" % { 'first': first.get('created_at'), 'last': last.get('created_at')}
        else:
            print "."
        save(search_term, tweets)
        save(search_term + "_binned", binned_tweets)

def cara():
    fields = { 'category': 'category', 'text': 'text', 'screen_name': 'screen_name', 'timestamp': 'timestamp' }
    candidates = [
        {'name': 'trump', 'terms': ['#Trump2016', '#MakeAmericaGreatAgain', '#TrumpForPresident2016']},
        {'name': 'cruz',  'terms': ['#TedCruz',   '#CruzCrew', '#TedCruz2016']},
        {'name': 'clinton', 'terms': ['#Hillary2016', '#ImWithHer', '#Hillary']},
        {'name': 'sanders', 'terms': ['#Bernie2016', '#FeelTheBern', '#VoteBernie']}
    ]
    issues = {}
    for candidate in candidates:
        candidate_name = candidate.get('name')
        issues[candidate_name] = Counter()
        for term in candidate.get('terms'):
            query = Query(term, limit=400, plugins=[CategoryPlugin(), LimitedFields(fields)])
            tweets = query.get_results()
            for tweet in tweets:
                issues[candidate_name].update(tweet.get('category'))
    print json.dumps(issues, indent=4, sort_keys=True)
    save('cara', issues)

if __name__ == '__main__':
    panama()