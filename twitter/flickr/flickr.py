# see https://stuvel.eu/flickrapi
import json
import time
import flickrapi
from utils.utils import print_dict, parseTime

timestamp = int(time.time())


class Flickr(object):
    OutDoors = 2;
    DefaultOpts = {'format': 'parsed-json', 'per_page': '10'}
    TinySquare = 's'
    SmallSquare = 'q'
    MediumSize = 'z'
    LargeSize = 'b'
    OriginalSize = 'o'

    @staticmethod
    def image_url(photo, size=MediumSize):
        # see https://www.flickr.com/services/api/misc.urls.html
        return "https://farm%(farm)s.staticflickr.com/%(server)s/%(id)s_%(secret)s_%(size)s.jpg" % {
            'farm': photo.get('farm'),
            'server': photo.get('server'),
            'id': photo.get('id'),
            'secret': photo.get('secret'),
            'size': size
        }

    def get_info(self, photo):
        info = self.api.photos.getInfo(photo_id=photo['id'], format='parsed-json')
        url  = Flickr.image_url(photo)
        return { 'info': info, 'url': url }

    def add_info(self, photo):
        photo.update(self.get_info(photo))

    def add_info_to_results(self):
        for photo in self.results:
            self.add_info(photo)

    def __init__(self, options):
        with open('.flickr_config.json') as data_file:
            config = json.load(data_file)
        api_key = config['key']
        api_secret = config['secret']
        self.options = Flickr.DefaultOpts.copy()
        self.options.update(options)
        self.api = flickrapi.FlickrAPI(api_key, api_secret)
        self.results = None
        self.count = 0
        self.total = 0
        self.search()
        self.add_info_to_results()

    def search(self):
        results = self.api.photos.search(**self.options).get('photos')
        self.total = results.get('total')
        photos = results.get('photo')
        self.count += len(photos)
        self.results = photos

    def test(self):
        for photo in self.results:
            print photo.get('url')
            print photo.get('title')


if __name__ == '__main__':
    boston = '5MvaTZJTUbx1uPnP'
    hongkong = '4Jji9AVTVrLRrBR9Zg'
    bejing = 'vQ6vOjpTU7_QE6S8'

    fboston = Flickr({
        'place_id': bejing,
        'min_taken_date': parseTime('2016-03-23')
    })
    fboston.test()
