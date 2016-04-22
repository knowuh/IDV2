from boto3.dynamodb.conditions import Key
from extractor.query import Query
from utils.utils import parseTime


an_hour = 60 * 60
default_start_time = parseTime("03-03-2016 12:00")


class ByHourQuery(Query):

    def __init__(self, tag, limit=100, plugins=[], start_time=default_start_time, interval=an_hour):
        super(self.__class__, self).__init__(tag, limit, plugins)
        self.limit = None
        self.filter = None
        self.start_time = start_time
        self.start_timestamp = start_time
        self.interval = interval
        self.send_timestamp = self.start_timestamp + self.interval
        self.conditions = self.conditions & Key('timestamp').between(self.start_timestamp, self.send_timestamp)

    def get_results(self):
        self._query_()
        while self.lastKey and (self.resultCount < self.limit):
            self._query_()
        return self.restructured()
