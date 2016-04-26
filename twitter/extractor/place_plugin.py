from random import uniform

from utils.utils import deep_fetch


class PlacePlugin(object):

    def random_coord(self, tweet):
        tweet['x'] = None
        tweet['y'] = None
        xs = []
        ys = []
        if tweet.get('bounding_box'):
            for coordinate in tweet.get('bounding_box')[0]:
                xs.append(float(coordinate[0]))
                ys.append(float(coordinate[1]))

            tweet['x'] = uniform(min(xs), max(xs))
            tweet['y'] = uniform(min(ys), max(ys))

    def process(self, arrayOfTweets):
        for i, tweet in enumerate(arrayOfTweets):
            tweet['country'] = deep_fetch(tweet, 'place.country')
            place_type = deep_fetch(tweet, 'place.place_type')
            if place_type == 'city':
                tweet['city'] = deep_fetch(tweet, 'place.name')
            tweet['country_code'] = deep_fetch(tweet, 'place.country_code')
            tweet['bounding_box'] = deep_fetch(tweet, 'place.bounding_box.coordinates')
            self.random_coord(tweet)