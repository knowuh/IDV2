# see https://stuvel.eu/flickrapi
import json
import time
from utils.utils import print_dict
# import os
# import re
from subprocess import call

timestamp = int(time.time())

with open('.flickr_config.json') as data_file:
    config = json.load(data_file)

api_key = config['key']
api_secret = config['secret']

flickr = flickrapi.FlickrAPI(api_key, api_secret)


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
    print_dict(info)
