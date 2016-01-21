#!/usr/bin/env python

import tweepy
import json
import pprint
from time import sleep

# put your credentials in twitter_config.json
# see twitter_config_sample.json
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


def stream(api,search_term="idv2"):
  last_id=0
  tweet_counter = 0
  while True:
    for tweet in api.search(search_term, since_id=last_id, rpp=99):
      print tweet_counter
      print tweet.id
      print tweet.coordinates
      print tweet.favorite_count
      print tweet.user.name
      print tweet.text
      print "-----"
      last_id = tweet.id
      tweet_counter = tweet_counter + 1
    sleep(10)
    
connection = connect()
stream(connection,'idv2')