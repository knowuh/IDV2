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

def save(term, results):
    filename = "../sample/%(search_term)s.json" % {"search_term": term}
    with open(filename, 'w') as outfile:
        json.dump(results, outfile, indent=4, sort_keys=True)


def foodporn():
    search_term = "#foodporn"
    query = Query(search_term, limit=400, qFilter=Query.ImageFitler, plugins=[SentimentPlugin()])
    save(search_term, query.get_results())


def fashion():
    search_term = "#fashion"
    query = Query(search_term, limit=50, qFilter=Query.ImageFitler)
    save(search_term, query.get_results())


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
        'timestamp': 'timestamp'
    }
    query = Query(search_term, limit=20, qFilter=Query.PlaceFilter, plugins=[PlacePlugin(), LimitedFields(fields)])
    tweets = query.get_results()
    for tweet in tweets:
        print tweet.get('screen_name')
    save(search_term, tweets)

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
    cara()