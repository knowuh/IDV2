# see https://stuvel.eu/flickrapi
from flickr import Flickr
import json
from utils.utils import parseTime

times = [
    {'start': '2015-01-1', 'end': '2015-02-1'},
    {'start': '2015-04-1', 'end': '2015-05-1'},
    {'start': '2015-08-1', 'end': '2015-09-1'},
    {'start': '2015-11-1', 'end': '2016-12-1'}
]

places = [
    {'name': "NewYork", 'id': ".skCPTpTVr.Q3WKW"},
    {'name': "Boston", 'id': "5MvaTZJTUbx1uPnP"},
    {'name': "Beijing", 'id': "vQ6vOjpTU7_QE6S8"},
    {'name': "Hongkong", 'id': "JAJiM7JTU78IjzqC"}
]

results = {}
for place in places:
    place_results = results[place.get('name')] = {}
    for time in times:

        query = Flickr({
            'place_id': place.get('id'),
            'sort': 'interestingness-desc',
            'per_page': 100,
            # 'text': 'landscape',
            'min_taken_date': parseTime(time.get('start')),
            'max_taken_date': parseTime(time.get('end'))
        })
        # place_results[time.get('start')] = query.results
        # The above yields a lot of unused json. Below just the title, and image url.
        place_results[time.get('start')] = [{'title': r.get('title'),'url': r.get('url')} for r in query.results]



with open("kini.json", 'w') as outfile:
    json.dump(results, outfile, indent=4, sort_keys=True)