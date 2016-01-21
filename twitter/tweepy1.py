#!/usr/bin/env python

import tweepy
import boto3
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

def connectDB():
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table('tweets')

def stream(api, table, search_term="idv2"):
  last_id=0
  tweet_counter = 0
  count=1000
  while True:
    for tweet in api.search(search_term,  count=count, max_id=str(last_id - 1)):
      data = tweet._json
      data['screen_name'] = tweet.user.screen_name
      print "%(id)s | %(screen_name)s : %(text)s" % data
      last_id = tweet.id
      tweet_counter = tweet_counter + 1
      try:
        #  data = dict((k, v) for k, v in tweet._json.iteritems() if v)
        table.put_item(Item=data)
      except:
        print "error (skipping tweet)"
      #print "json: %(json)s" % {'json': tweet._json}
    sleep(2)

connection = connect()
table = connectDB()
stream(connection, table, 'taco')
