
def ccount(collection):
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
