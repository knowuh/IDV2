# -*- coding: utf-8 -*-
import urllib2
import os
import base64
import httplib2
from apiclient.discovery import build
from oauth2client.client import GoogleCredentials

API_DISCOVERY_FILE = 'https://vision.googleapis.com/$discovery/rest?version=v1'

class LabelImage(object):
    def __init__(self):
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '.google_vision_api_config.json'
        http = httplib2.Http()
        credentials = GoogleCredentials.get_application_default().create_scoped(
            ['https://www.googleapis.com/auth/cloud-platform'])
        credentials.authorize(http)
        self.service = build('vision', 'v1', http, discoveryServiceUrl=API_DISCOVERY_FILE)

    def label(self, photo_url):
        image_content = base64.b64encode(urllib2.urlopen(photo_url).read())
        service_request = self.service.images().annotate(
            body={
                'requests': [{
                    'image': {
                        'content': image_content
                    },
                    'features': [{
                        'type': 'LABEL_DETECTION',
                        'maxResults': 4,
                    }]
                }]
            })
        return service_request.execute()

    def batch_size(self):
        return 1

    def process(self, tweets):

    def print_labels(self, photo_file):
        response = self.label(photo_file)
        annotations = response['responses'][0]['labelAnnotations']
        for annotation in annotations:
            label = annotation['description']
            print('Found label: %s for %s' % (label, photo_file))


if __name__ == '__main__':
    api = LabelImage()
    api.print_labels("https://upload.wikimedia.org/wikipedia/commons/5/54/TaraxacumOfficinaleSeed.JPG")
