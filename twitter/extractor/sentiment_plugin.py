from monkeylearn import MonkeyLearn
import json

class SentimentPlugin(object):
    def __init__(self):
        config = json.load(open('.monkeylearn_config.json'))
        self.private_token = config['private_token']
        self.module_id = config['module_id']
        self.monkey = MonkeyLearn(self.private_token)

    def get_text(self, tweet):
        return tweet['text']

    def process(self, arrayOfTweets):
        texts =  map(self.get_text, arrayOfTweets)
        module_id = self.module_id
        res = self.monkey.classifiers.classify(module_id, texts)

        for i, tweet in enumerate(arrayOfTweets):
            tweet['sentiment'] = res.result[i][0]['label']
            tweet['probability'] = res.result[i][0]['probability']

            print tweet['text']
            print tweet['sentiment']
            print tweet['probability']
