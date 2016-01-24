#!/usr/bin/env python

import json
import os

import tweepy
import boto3

from time import mktime, sleep
from dateutil import parser

# put your credentials in twitter_config.json
# see twitter_config_sample.json

# This will load AWS config info from ~/.aws/config

os.environ["AWS_PROFILE"] = "idv2"

def remove_none(obj):
  if isinstance(obj, (list, tuple, set)):
    return type(obj)(remove_none(x) for x in obj if x)
  elif isinstance(obj, dict):
    return type(obj)((remove_none(k), remove_none(v))
      for k, v in obj.items() if v)
  else:
      # return obj
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


def stream(api, table, search_terms=["idv2"]):
    last_id = 0
    tweet_counter = 0
    loop_counter = 0
    max_results = 1000
    rate_limit_time = 15 * 60 # 15 minutes
    last_tweet_dict = dict.fromkeys(search_terms, 0)
    sleep_time_s=2
    while True:
        for search_term in search_terms:
            print "%(max_results)02d  ------------------------" % {'max_results': loop_counter}
            try:
                last_tweet_dict[search_term] = search_twitter(api, last_tweet_dict[search_term], max_results, search_term, tweet_counter)
            except tweepy.TweepError:
                sleep(rate_limit_time)
                continue
            sleep(sleep_time_s)
        loop_counter += 1


def search_twitter(api, _last_id, max_results, search_term, tweet_counter):
    last_id = _last_id
    for tweet in api.search(search_term, count=max_results, max_id=str(last_id - 1)):
        data = tweet_to_dict(tweet, search_term)
        print "%(id)s | %(screen_name)s : %(text)s" % data
        last_id = tweet.id
        tweet_counter += 1
        save_to_db(data)
    return last_id


def save_to_db(data):
    try:
        table.put_item(Item=data)
    except Exception as e:
        print "error (skipping tweet)"
        print e
        print data


connection = connect()
table = connect_db()
print table
stream(connection, table, search_terms=["#ocw","#blm","gunviolence","#gunviolence","bernie sanders","hillary clinton"])
