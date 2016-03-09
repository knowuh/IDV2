import os
import simplejson as json
os.environ["AWS_PROFILE"] = "idv2"
from extractor.query import Query

searchTerm = "#marketcrash"

tweets = Query(searchTerm, limit=400)
results = tweets.get_results()
filename = "%(search_term)s.json" % {"search_term": searchTerm}

with open(filename, 'w') as outfile:
    json.dump(results, outfile)
