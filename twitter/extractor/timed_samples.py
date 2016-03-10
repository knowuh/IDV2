import boto3
from boto3.dynamodb.conditions import Key, Attr
from extractor.query import Query
from extractor.utils import deep_fetch


# The basic idea:  How many tweets came in for a given interval
# Count how many at each time sample.  Bin the time samples
# Read something about histograms.
class TimedSamples(Query):
    def __init__(self, tag, start_time, end_time, interval, sample_time, limit=100):
        super(TimedSamples,self).__init__(tag, limit)
        # TODO: Something about