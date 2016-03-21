import os
import simplejson as json
os.environ["AWS_PROFILE"] = "idv2"
from extractor.query import Query
from extractor.sentiment_plugin import SentimentPlugin
from extractor.label_image import LabelImage

searchTerm = "#foodporn"

tweets = Query(searchTerm, limit=4, plugins=[SentimentPlugin(), LabelImage()])
results = tweets.get_results()
filename = "../sample/%(search_term)s.json" % {"search_term": searchTerm}

with open(filename, 'w') as outfile:
    json.dump(results, outfile)
