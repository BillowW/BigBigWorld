# -*- coding = utf-8 -*-
from bs4 import BeautifulSoup  #网页解析
import re  #文字匹配
import urllib.request, urllib.error,urllib.parse
import string


def main():
    baseurl = "http://www.52jingsai.com/bisai/index.php?page="
    print(baseurl)
    datalist = getData(baseurl)# 1.爬取网页 2.解析数据
    print((datalist))
    datalist1 = str(datalist)
    # 3.保存数据
    f = open('test.txt','w',encoding='utf-8')
    f.writelines(datalist1)
    f.close()
findTitless = re.compile(r'<a class="xi2" href="(.*)">(.*)</a> </dt>',re.S)
findContencess = re.compile(r'<dd class="xs2 cl">(.*)<div class="list_info">',re.S)
findSortss = re.compile(r'<label><a class="xi2" href="(.*)">(.*)</a></label>',re.S)



# 爬取网页
def getData(baseurl):
    datalist =[]
    for i in range(0, 100):
        url = baseurl +"pn"+str(i)
        html = askURL(url)  # 保存获取到的网页源码
        # 2.逐一解析数据
        soup = BeautifulSoup(html,"html.parser")
        for item in soup.find_all('dl',class_="bbda list_bbda cl"):
            data =[]
            item = str(item)
            print(item)
            titless = re.findall(findTitless,item)[0]#解析名字
            titless = str(titless)
            titless = re.sub('/'," ",titless)
            titless = re.sub('<br(\s+)?/>(\s+)'," ",titless)
            data.append(str(titless).strip())
            contencess = re.findall(findContencess, item)[0]#解析内容
            contencess = str(contencess)
            contencess = re.sub('/'," ",contencess)
            contencess = re.sub('<br(\s+)?/>(\s+)'," ",contencess)
            data.append(str(contencess).strip())
            sortss = re.findall(findSortss, item)[0]#解析分类
            sortss = str(sortss)
            sortss = re.sub('/'," ",contencess)
            sortss = re.sub('<br(\s+)?/>(\s+)'," ",sortss)
            data.append(str(sortss))
            datalist.append(data)
    return datalist


# 得到指定一个URL的网页内容
def askURL(url):
    head = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"
    }
    request = urllib.request.Request(url, headers=head)
    html = ""
    try:
        response = urllib.request.urlopen(request)
        print(response.status)
        final_response = response.read()
        html = final_response.decode('gb18030')
    except urllib.error.URLError as e:
        if hasattr(e, "code"):
            print(e.code)
        if hasattr(e, "reason"):
            print(e.reason)
    return html




if __name__ == '__main__':
    main()
    print("爬取完毕！")

