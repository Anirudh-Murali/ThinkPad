# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'}


def googleImg(keywords):
    searchQuery = "";
    for term in keywords:
        searchQuery = searchQuery + term + " ";
    quote_page = "https://www.google.co.in/search?q="+searchQuery+"&client=ubuntu&hs=wBD&channel=fs&dcr=0&tbm=isch&tbas=0&source=lnt&sa=X&ved=0ahUKEwixqYnNmPHWAhUZSI8KHZRAAQkQpwUIHg&biw=1546&bih=818&dpr=1.2"
    r = requests.get(quote_page,headers = headers)

    soup = BeautifulSoup(r.content, "html.parser")


    links = []

    for data in soup.findAll('img',{'class':"rg_ic rg_i"}):
        datastr = str(data);
        sp = datastr.split('"');
        if sp[5] != "f":
            print sp[5];
            links.append(sp[5]);

    return links;
