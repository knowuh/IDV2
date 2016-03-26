import json


class TimeBinner(object):
    def __init__(self, data, interval=60 * 60):
        self.data = data
        self.interval = interval
        self.bins = {}
        self.process_datum(data)

    def process_datum(self, datum):
        time_index = 0
        while datum.timestamp > time_index + self.interval:
            if time_index not in self.bins:
                self.bins[time_index] = []
        time_index += self.interval
        if time_index not in self.bins:
            self.bins[time_index] = []
        self.bins[time_index].push(datum)

    def to_s(self):
        for key in self.bins:
            value = self.bins[key]
            print "%(key)s, %(size)d" % {'key': key, 'size': len(value)}


if __name__ == '__main__':
    data = json.load(open('../sample/#fashion.json'))
    binner = TimeBinner(data)

