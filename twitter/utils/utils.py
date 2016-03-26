from time import mktime
from dateutil import parser

def count(collection):
    return sum(1 for i in collection)


def deep_fetch(item, item_path, default=None):
    keys = item_path.split(".")
    for key in keys[:-1]:
        if isinstance(item, dict) and item.has_key(key):
            item = item.get(key)
        else:
            return default
    last_key = keys[-1]
    if isinstance(item, dict) and item.has_key(last_key):
        return item[last_key]
    else:
        return default


def print_dict(d, last=""):
    for key, value in d.iteritems():
        this_key = last + "." + str(key)
        if isinstance(value, dict):
            print_dict(value, this_key)
        elif isinstance(value, int):
            print this_key + ": " + str(value)
        elif isinstance(value, basestring):
            print this_key + ": " + value


def parseTime(time_string):
    return int(mktime(parser.parse(time_string).timetuple()))
