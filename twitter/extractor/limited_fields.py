from utils.utils import deep_fetch

class LimitedFields(object):

    def __init__(self,fields=[]):
        self.fields = fields

    def process(self, arrayOfTweets):
        for i, tweet in enumerate(arrayOfTweets):
            copy = tweet.copy()
            tweet.clear()
            for field, lookup in self.fields.iteritems():
                tweet[field] = deep_fetch(copy, lookup)
