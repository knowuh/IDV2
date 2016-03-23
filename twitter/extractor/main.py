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


def zika():
    search_term = "#zika"
    query = Query(search_term, limit=100, qFilter=Query.PlaceFilter, plugins=[PlacePlugin()])
    tweets = query.get_results()
    for tweet in tweets:
        print tweet['country']
    save(search_term, tweets)

    # start_time = parseTime("02-18-2016 1:00")
    # interval = 60 * 60
    # for hour in range(0,24):
    #     adjustment_hour = hour * interval
    #     search = ByHourQuery(search_term, limit=20, start_time=start_time + adjustment_hour, interval=interval)
    #     results = search.get_results()
    #     print "hour: %(hour)s size: %(size)d" % {'hour': hour, 'size': len(results)}

zika()