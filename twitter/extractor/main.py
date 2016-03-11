import os
import simplejson as json
os.environ["AWS_PROFILE"] = "idv2"
from extractor.query import Query
from extractor.sentiment_plugin import SentimentPlugin

searchTerm = "donald trump"

tweets = Query(searchTerm, limit=40, plugins=[SentimentPlugin()])
results = tweets.get_results()
filename = "../sample/%(search_term)s.json" % {"search_term": searchTerm}

with open(filename, 'w') as outfile:
    json.dump(results, outfile)
