"""
You must first install the python image library:

sudo easy_install pip
pip install Pillow

"""
from PIL import Image
import urllib2 as urllib
import io


def rgb_to_hex(rgb):
    return '#%02x%02x%02x' % rgb

def get_colors(url="", numcolors=4, swatchsize=20, resize=150):
    fd = urllib.urlopen(url)
    image_file = io.BytesIO(fd.read())
    image = Image.open(image_file)
    image = image.resize((resize, resize))
    result = image.convert('P', palette=Image.ADAPTIVE, colors=numcolors)
    result.putalpha(0)
    colors = result.getcolors(resize*resize)
    colors = sorted(colors, key=lambda color: color[0], reverse=True)
    hex_colors = []
    for count, col in colors:
        hexv = rgb_to_hex(col[0:3])
        hex_colors.append(hexv)
    return hex_colors

if __name__ == '__main__':
    image_url = 'http://weknowyourdreamz.com/images/food/food-04.jpg'
    print get_colors(url=image_url)