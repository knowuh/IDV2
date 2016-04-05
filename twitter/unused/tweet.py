from pynamodb.models import Model
from pynamodb.attributes import (
    UnicodeAttribute, NumberAttribute, UnicodeSetAttribute, UTCDateTimeAttribute, JSONAttribute
)

from pynamodb.indexes import LocalSecondaryIndex, AllProjection

class SearchTermIndex(LocalSecondaryIndex):
    """
    an index on the search term used to collect tweet
    """
    class Meta:
        projection = AllProjection()
        index_name = 'search_term-timestamp-index'
    search_term = UnicodeAttribute(hash_key=True)
    timestamp = NumberAttribute(range_key=True)

class ScreenNameIndex(LocalSecondaryIndex):
    """
    an index on the screen_name of the tweeeter
    """
    class Meta:
        projection = AllProjection()
        index_name = 'screen_name-timestamp-index'
    screen_name = UnicodeAttribute(hash_key=True)
    timestamp = NumberAttribute(range_key=True)


class Tweet(Model):
    class Meta:
        table_name = 'tweets'
        read_capacity_units = 10
        write_capacity_units = 10

    id = UnicodeAttribute(hash_key=True)
    screen_name = UnicodeAttribute(range_key=True)
    search_term = UnicodeAttribute(range_key=True)
    text = UnicodeAttribute()
    lang = UnicodeAttribute()
    timestamp = NumberAttribute()
    retweet_count = NumberAttribute()
    in_reply_to_screen = UnicodeAttribute(range_key=True)
    image = UnicodeAttribute()
    metadata = JSONAttribute()
    by_user   = ScreenNameIndex()
    by_search = SearchTermIndex()

    # def write_collection(collection,filename="output.json"):
    #     with open("Output.txt", "w") as text_file:
    #         text_file.write("[")
    #         for item in collection:
    #             text_file.write(item._get_json()[1])