import flickrapi
import json
# import os
# import re
import time
from subprocess import call

timestamp = int(time.time())

with open('flikr_config.json') as data_file:
    config = json.load(data_file)

api_key = config['key']
api_secret = config['secret']

flickr = flickrapi.FlickrAPI(api_key, api_secret)
def pretty(d, last=""):
   for key, value in d.iteritems():

      this_key = last + "." + str(key)
      if isinstance(value, dict):
         pretty(value, this_key)
      elif isinstance(value, int):
         print this_key + ": " + str(value)
      elif isinstance(value, basestring):
         print this_key + ": " + value

# for photo in flickr.walk(tag_mode='all',
#         tags='fish'):

def url(photo):
    return "https://farm%(farm)s.staticflickr.com/%(server)s/%(id)s_%(secret)s_z.jpg" % photo

for photo in flickr.photos.search(
        min_upload_date=timestamp - (60 * 14),
        per_page=10,
        format='parsed-json')['photos']['photo']:
    print photo['title']

    info = flickr.photos.getInfo(photo_id=photo['id'], format='parsed-json')
    # pretty(info)
    print url(info['photo'])
    pretty(info)
