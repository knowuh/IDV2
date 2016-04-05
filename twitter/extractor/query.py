import boto3
from boto3.dynamodb.conditions import Key, Attr
from utils.utils import deep_fetch


class Query(object):
    ImageFitler = Attr('image').exists()
    GeoFilter = Attr('coordinates').exists()
    PlaceFilter = Attr('place').exists()

    def __init__(self, tag, limit=100, plugins=[], qFilter=None):
        dynamodb = boto3.resource('dynamodb')
        self.limit = limit
        self.indexName = 'search_term-timestamp-index'
        self.tag = tag
        self.table = dynamodb.Table('tweets')
        self.conditions = Key('search_term').eq(self.tag)
        self.results = []
        self.resultCount = 0
        self.lastKey = None
        self.filter = qFilter
        self.plugins = plugins

    def _query_(self):
        args = {
            'KeyConditionExpression': self.conditions,
            'IndexName': self.indexName
        }
        if self.limit:
            args['Limit'] = self.limit
        if self.lastKey:
            args['ExclusiveStartKey'] = self.lastKey
        if self.filter:
            args['FilterExpression'] = self.filter

        results = self.table.query(**args)
        self.resultCount += results['Count']
        self.results = self.results + results['Items']
        if results.has_key('LastEvaluatedKey'):
            self.lastKey = results['LastEvaluatedKey']
        else:
            self.lastKey = None


    def _map_(self, item):
        pull_mentions = lambda m : m['screen_name']
        pull_hashtags = lambda m : m['text']
        item['location'] = deep_fetch(item, 'user.location')
        item['avitar'] = deep_fetch(item, 'user.profile_image_url')
        item['folower_count'] = deep_fetch(item, 'user.followers_count')
        mentions = deep_fetch(item,'entities.user_mentions')
        hashtags = deep_fetch(item,'entities.hashtags')
        if isinstance(mentions, list):
            item['mentions'] = map(pull_mentions, mentions)
        if isinstance(hashtags, list):
            item['hashtags'] = map(pull_hashtags, hashtags)
        return item

    def restructured(self):
        res =  map(self._map_, self.results)
        for plugin in self.plugins:
            batch_size = 100
            size = len(self.results)
            for ndx in range(0, size, batch_size):
                plugin.process(self.results[ndx:min(ndx + batch_size, size)])
        return res

    def get_results(self):
        self._query_()
        while (self.lastKey) and (self.resultCount < self.limit):
            self._query_()
        return self.restructured()
