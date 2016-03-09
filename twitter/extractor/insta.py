from instagram.client import InstagramAPI
import json
# import os
# import re

with open('instagram_config.json') as data_file:
    config = json.load(data_file)

api = InstagramAPI(client_id=config['client_id'],
                   client_secret=config['client_secret'],
                   access_token=config['access_token']
                   )
print api.access_token
users = api.user_search(q='knowuh', count=10)
for user in users:
   print user.id
recent_media, next_ = api.user_recent_media(user_id="3741139")
for media in recent_media:
    print media.images