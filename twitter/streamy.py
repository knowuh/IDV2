#!/usr/bin/env python
import json
import os
import re
import tweepy
import boto3

from time import mktime, sleep
from dateutil import parser

"""
put your credentials in twitter_config.json
see twitter_config_sample.json
This will load AWS config info from ~/.aws/config
"""

os.environ["AWS_PROFILE"] = "idv2"

def remove_none(obj):
  if isinstance(obj, (list, tuple, set)):
    return type(obj)(remove_none(x) for x in obj if x)
  elif isinstance(obj, dict):
    return type(obj)((remove_none(k), remove_none(v))
      for k, v in obj.items() if v)
  else:
      if isinstance(obj, float):
          return str(obj)
      else:
        return obj

def connect():
    with open('twitter_config.json') as data_file:
        config = json.load(data_file)

    consumer_key = config['consumer_key']
    consumer_secret = config['consumer_secret']
    access_token = config['access_token']
    access_secret = config['access_secret']

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_secret)
    return tweepy.API(auth)

def connect_db():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table('tweets')

def tweet_to_dict(tweet, search_term):
    # Remove items with '' (empty) values
    data = tweet._json.copy()
    data['screen_name'] = tweet.user.screen_name
    created_at = parser.parse(data['created_at'])
    data['timestamp'] = int(mktime(created_at.timetuple()))
    data['search_term'] = search_term
    return remove_none(data)

def save_to_db(data):
    try:
        table.put_item(Item=data)
    except Exception as e:
        print "error (skipping tweet)"
        print e
        print data

class MyStreamListener(tweepy.StreamListener):
    def __init__(self, _terms):
        super(MyStreamListener,self).__init__()
        self.count = 0
        self.fail_count = 0
        self.success_count = 0
        self.terms = _terms

    def get_search_term(self,text):
        for item in self.terms:
            if re.search(item, text, re.I):
                return item
        else:
            return 'no tag'

    def on_error(self, status_code):
        rate_limit_time = 15 * 60 # 15 minutes
        self.fail_count += 1
        print "Error with twitter stream "
        sleep(rate_limit_time)

    def on_status(self, status):
        print "--(%(counter)d | %(success)d)" % {'counter': self.count, 'success': self.success_count }

        data = tweet_to_dict(status, "testing-01234")

        search_term = self.get_search_term(data['text'])
        if search_term != 'no tag':
            data['search_term'] = search_term
            print "%(id)s | %(search_term)s - %(screen_name)s : %(text)s" % data
            save_to_db(data)
            self.success_count +=1
        self.count += 1


table = connect_db()


search_terms = [
    "#zika", "gunviolence" , "#massshooting",
    "donald trump", "marko rubio", "TED CRUZ", "jeb bush", "#marketcrash", "#stockcrash",
    "bernie sanders", "hillary clinton", "#blm", "#Flint", "#istandwithsalman", "#SalmanRushdie",
    "#foodporn", "#instafood", "#fashion",
    "#Trump2016", "#TedCruz", "#Hillary2016", "#Bernie2016",
    "#MakeAmericaGreatAgain", "#CruzCrew", "#ImWithHer", "#FeelTheBern, #panamapapers"
]

myStreamListener = MyStreamListener(search_terms)

while True:
    try:
        api = connect()
        myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
        myStream.filter(track=myStreamListener.terms)
    except Exception as e:
        print "Error. %(error)s" % {'error': e}
        sleep(15 * 60)