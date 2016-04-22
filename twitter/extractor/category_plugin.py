from utils.utils import deep_fetch
import re

DefaultCategories = [
    {'category': 'environment', 'tags': ['fracking', 'climate', 'environment', 'solar', 'renewable']},
    {'category': 'economy',     'tags': ['jobs', 'growth', 'income', 'money', 'wall street', 'banks']},
    {'category': 'security',    'tags': ['defense', 'isis', 'terrorism', 'terrorist', 'violence', 'crime']},
    {'category': 'justice',     'tags': ['justice', 'minority', 'diversity', 'equality', 'inclusion']}
]
class CategoryPlugin(object):
    def __init__(self,categories=DefaultCategories):
        self.categories = categories

    def process(self, arrayOfTweets):
        for i, tweet in enumerate(arrayOfTweets):
            tweet['category'] = []
            for category in self.categories:
                matches = 0
                for tag in category.get('tags'):
                    if re.search(tag, tweet.get('text'), re.IGNORECASE):
                        matches = matches + 1
                if matches > 0:
                    tweet['category'].append(category.get('category'))