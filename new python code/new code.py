# coding:utf - 8
import re
import queue
import urllib.request
import urllib.error
from urllib.parse import urlparse, urljoin
import urllib
from collections import deque
import chardet
from bs4 import BeautifulSoup

def detect(data):
    '''检测网页编码方式'''
    chardet = chardet.detect(data)['encoding']#键对应字符串的编码值
    return chardet

def getlinks(html):
    '''网络内容获取超链接'''
    linkre = re.compile('href = ["\'](.+?)["\']',re.IGNORECASE)
    return linkre.findall(html)

def pageread(url):
    '''读取网页内容并解码'''
    html = b""
    try:
        html = urllib.request.urlopen(url).read()
    except urllib.error.HTTPError as e:
        print(e)
        return str(e)
    charset = detect(html)
    decodedhtml = html.decode(charset)
    return decodedhtml

baseurl = 'http'                       #起始地址
queue = deque()                     #定义双向队列用于存储即将抓取的URL
willvisit = set()                   #定义集合，用于去除重复的URL
queue.append(baseurl)               #起始地址作为第一个元素放进队列
willvisit.add(baseurl)              #把起始的URL标记为已访问
get_cnt = 0                         #获取的网页数
append_cnt = 0                      #往队列中添加的URL数量

while queue:
    willget_url = queue.popleft() #队首元素出队
    print('已经抓取：'+ str(get_cnt) + '正在抓取《-- -' + willget_url)
    get_cnt += 1
    decodedhtml = pageread(willget_url) #读取网页内容
    #print(decodedhtml)   #打印网页内容
    if append_cnt>10:
        continue
    for x in getlinks(decodedhtml):
        newurl = ''
        x = x.strip()
        if ((x[0:4] == 'http')and(',htm'in x)and(baseurl in x)and(x not in willvisit)):  #绝对地址
            queue.append(x)
            willvisit.add(x)
            print('加入第'+str(append_cnt)+'个队列-- ->' + x)
            append_cnt += 1
        else:
            newurl = urljoin(willget_url,x)
            if((newurl not in willvisit) and (baseurl in newurl) and ('.htm' in x)):
                # baseurl in newurl将抓取范围限定在本网站内，'.htm' in x 限定仅抓取 htm 网页
                queue.append(newurl)
                willvisit.add(newurl)
                print('加入第' + str(append_cnt) + '个队列-- ->' + newurl)
                append_cnt +=1

