import os
import simplejson as json
os.environ["AWS_PROFILE"] = "idv2"
from extractor.query import Query
from extractor.by_hour_query import ByHourQuery, parseTime

from extractor.sentiment_plugin import SentimentPlugin
from extractor.place_plugin import PlacePlugin
from extractor.label_image import LabelImage


def save(term, results):
    filename = "../sample/%(search_term)s.json" % {"search_term": term}
    with open(filename, 'w') as outfile:
        json.dump(results, outfile)


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
    query = Query(search_term, limit=100, qFilter=Query.PlaceFilter, plugins=[PlacePlugin()])
    tweets = query.get_results()
    for tweet in tweets:
        print tweet.get('country_code')
    save(search_term, tweets)

fashion()