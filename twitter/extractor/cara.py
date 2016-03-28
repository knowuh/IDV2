import os
import simplejson as json
from collections import Counter

os.environ["AWS_PROFILE"] = "idv2"

class Issue(object):
    issues = []
    def __init__(self, issue_name, tags=[]):
        self.name = issue_name
        self.tags = tags
        Issue.issues.append(self)

    def add_tag(self, tag):
        self.tags.append(tag)
        return self

    def has_tag(self, tag):
        return self.tags.count(tag) > 0

    @staticmethod
    def issues_for_tweet(tweet):
        tags = tweet.get('hashtags')
        results = set()
        if tags is None:
            return []
        for tag in tags:
            for issue in Issue.issues:
                if issue.has_tag(tag):
                    results.add(issue.name)
        return list(results)


class Candidate(object):
    def __init__(self, name, candidate_tags=[]):
        self.name = name
        self.issues = Counter()
        self.tags = Counter()
        self.candidate_tags = candidate_tags

    def add_candidate_tag(self, tag):
        self.candidate_tags.append(tag)
        return self

    def process_tweet(self, tweet):
        self.tags.update(tweet.get('hashtags'))
        self.issues.update(Issue.issues_for_tweet(tweet))

    def stats(self):
        return {
            "tags": self.tags.most_common(10),
            "issues": self.issues.most_common(3)
        }


def save(term, results):
    filename = "../sample/%(search_term)s.json" % {"search_term": term}
    with open(filename, 'w') as outfile:
        json.dump(results, outfile)

def load(term):
    filename = "../sample/%(search_term)s.json" % {"search_term": term}
    return json.load(open(filename))


Issue('defense', ['army', 'war', 'navy', 'defense', 'military'])
Issue('terrorism', ['terrorism','isis'])
Issue('environment', ['globalwarming','environment'])

data = load("hillary clinton")
hillary = Candidate("hillary clinton")
for tweet in data:
    hillary.process_tweet(tweet)

print hillary.stats()