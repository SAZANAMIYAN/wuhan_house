import requests
import time
from multiprocessing import Pool
from lxml import etree
import pandas as pd
import os
import random

# 获取房源的基本url
# 参数page
# 这个直接默认城市了，爬的时候再替换吧
def get_home_urls(pages=1):
    base_url = 'https://bj.zu.ke.com/zufang/'
    page_url = 'https://bj.zu.ke.com/zufang/pg{}'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        'Cookie': 'lianjia_uuid=e6a91b7a-b6a4-40b5-88c6-ff67759cbc8a; crosSdkDT2019DeviceId=-51npj6--xbmlw5-f22i5qg8bh36ouv-yttqkmwdf; _ga=GA1.2.121082359.1579583230; ke_uuid=6de1afa21a5799c0874702af39248907; __xsptplus788=788.1.1579583230.1579583347.4%234%7C%7C%7C%7C%7C%23%23Q6jl-k46IlXjCORdTOp6O3JyzHokoUrb%23; select_city=110000; digv_extends=%7B%22utmTrackId%22%3A%2280418605%22%7D; lianjia_ssid=a4ab1bc0-cb04-492f-960c-342c66065da0; Hm_lvt_9152f8221cb6243a53c83b956842be8a=1583897013,1583932737; User-Realip=111.196.247.121; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2216fc67f100b140-06f07f8f707639-33365a06-1049088-16fc67f100c603%22%2C%22%24device_id%22%3A%2216fc67f100b140-06f07f8f707639-33365a06-1049088-16fc67f100c603%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_utm_source%22%3A%22baidu%22%2C%22%24latest_utm_medium%22%3A%22pinzhuan%22%2C%22%24latest_utm_campaign%22%3A%22wybeijing%22%2C%22%24latest_utm_content%22%3A%22biaotimiaoshu%22%2C%22%24latest_utm_term%22%3A%22biaoti%22%7D%7D; Hm_lpvt_9152f8221cb6243a53c83b956842be8a=1583933576; srcid=eyJ0Ijoie1wiZGF0YVwiOlwiMjAxZjBjNWU1ZWE1ZGVmYjQxZDFlYTE4MGVkNWI1OGRjYzk5Mzc2MjEwNTcyMWI3ODhiNTQyNTExOGQ1NTVlZDNkMTY2MWE2YWI5YWRlMGY0NDA3NjkwNWEyMzRlNTdhZWExNDViNGFiNWVmMmMyZWJlZGY1ZjM2Y2M0NWIxMWZlMWFiOWI2MDJiMzFmOTJmYzgxNzNiZTIwMzE1ZGJjNTUyMWE2ZjcxYzZmMTFhOWIyOWU2NzJkZTkyZjc3ZDk1MzhiNjhhMTQyZDQ2YmEyNjJhYzJmNjdjNmFjM2I5YzU0MzdjMDkwYWUwMzZmZjVjYWZkZTY5YjllYzY0NzEwMWY2OTc1NmU1Y2ExNzNhOWRmZTdiNGY4M2E1Zjc2NDZmY2JkMGM2N2JiMjdmZTJjNjI2MzNkMjdlNDY4ODljZGRjMjc3MTQ0NDUxMDllZThlZDVmZmMwMjViNjc2ZjFlY1wiLFwia2V5X2lkXCI6XCIxXCIsXCJzaWduXCI6XCJkMDI2MDk0N1wifSIsInIiOiJodHRwczovL2JqLmtlLmNvbS9lcnNob3VmYW5nLzE5MTExMzE5NTEwMTAwMTcxNzU5Lmh0bWwiLCJvcyI6IndlYiIsInYiOiIwLjEifQ=='
    }
    
    all_detail_urls = []
    
    for page in range(1, pages + 1):
        if page == 1:
            url = base_url
        else:
            url = page_url.format(page)
            
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            html = etree.HTML(response.text)
            detail_urls = html.xpath('//a[@class="content__list--item--aside"]/@href')
            full_urls=[]
            for url in detail_urls:
                full_url = 'https://bj.zu.ke.com/' + url
                full_urls.append(full_url)
            
            all_detail_urls.extend(full_urls)            
            # 可选：打印当前页数和该页获取的URL数量，用于调试
            print(f'Page {page}: Found {len(detail_urls)} URLs.')
        else:
            print(f'Failed to retrieve page {page}, status code {response.status_code}')
    
    return all_detail_urls

# 获取房源详细数据信息
def get_home_detail_infos(detail_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        'Cookie': 'lianjia_uuid=e6a91b7a-b6a4-40b5-88c6-ff67759cbc8a; crosSdkDT2019DeviceId=-51npj6--xbmlw5-f22i5qg8bh36ouv-yttqkmwdf; _ga=GA1.2.121082359.1579583230; ke_uuid=6de1afa21a5799c0874702af39248907; __xsptplus788=788.1.1579583230.1579583347.4%234%7C%7C%7C%7C%7C%23%23Q6jl-k46IlXjCORdTOp6O3JyzHokoUrb%23; select_city=110000; digv_extends=%7B%22utmTrackId%22%3A%2280418605%22%7D; lianjia_ssid=a4ab1bc0-cb04-492f-960c-342c66065da0; Hm_lvt_9152f8221cb6243a53c83b956842be8a=1583897013,1583932737; User-Realip=111.196.247.121; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2216fc67f100b140-06f07f8f707639-33365a06-1049088-16fc67f100c603%22%2C%22%24device_id%22%3A%2216fc67f100b140-06f07f8f707639-33365a06-1049088-16fc67f100c603%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_utm_source%22%3A%22baidu%22%2C%22%24latest_utm_medium%22%3A%22pinzhuan%22%2C%22%24latest_utm_campaign%22%3A%22wybeijing%22%2C%22%24latest_utm_content%22%3A%22biaotimiaoshu%22%2C%22%24latest_utm_term%22%3A%22biaoti%22%7D%7D; Hm_lpvt_9152f8221cb6243a53c83b956842be8a=1583933576; srcid=eyJ0Ijoie1wiZGF0YVwiOlwiMjAxZjBjNWU1ZWE1ZGVmYjQxZDFlYTE4MGVkNWI1OGRjYzk5Mzc2MjEwNTcyMWI3ODhiNTQyNTExOGQ1NTVlZDNkMTY2MWE2YWI5YWRlMGY0NDA3NjkwNWEyMzRlNTdhZWExNDViNGFiNWVmMmMyZWJlZGY1ZjM2Y2M0NWIxMWZlMWFiOWI2MDJiMzFmOTJmYzgxNzNiZTIwMzE1ZGJjNTUyMWE2ZjcxYzZmMTFhOWIyOWU2NzJkZTkyZjc3ZDk1MzhiNjhhMTQyZDQ2YmEyNjJhYzJmNjdjNmFjM2I5YzU0MzdjMDkwYWUwMzZmZjVjYWZkZTY5YjllYzY0NzEwMWY2OTc1NmU1Y2ExNzNhOWRmZTdiNGY4M2E1Zjc2NDZmY2JkMGM2N2JiMjdmZTJjNjI2MzNkMjdlNDY4ODljZGRjMjc3MTQ0NDUxMDllZThlZDVmZmMwMjViNjc2ZjFlY1wiLFwia2V5X2lkXCI6XCIxXCIsXCJzaWduXCI6XCJkMDI2MDk0N1wifSIsInIiOiJodHRwczovL2JqLmtlLmNvbS9lcnNob3VmYW5nLzE5MTExMzE5NTEwMTAwMTcxNzU5Lmh0bWwiLCJvcyI6IndlYiIsInYiOiIwLjEifQ=='
    }
    detail_text = requests.get(detail_url,headers=headers).text
    html = etree.HTML(detail_text)
    try:
        # 解析获取相关数据
        # 房屋名称
        home_name = html.xpath('//p[@class="content__title"]/text()')[0].strip()
        # 房屋价格
        home_price = html.xpath('//div[@class="content__aside--title"]//span/text()')[0]
        # 房屋信息
        home_info = html.xpath('//div[@class="content__article__info"]/ul/li[@class="fl oneline"]')
        home_info = [item.xpath('normalize-space(.)') for item in home_info if item.xpath('normalize-space(.)')]
        # 过滤掉空字符串
        home_info= [info for info in home_info if info]
        # 房屋设施
        facility_names = html.xpath('//ul[@class="content__article__info2"]/li[position() > 1]/text()')
        facility_names = [name.strip() for name in facility_names if name.strip()]
        # 房屋费用
        # 提取表格标题
        titles = html.xpath('//ul[@class="table_title"]/li[@class="table_col"]/text()')
        # 提取表格数据行中的所有值
        values = html.xpath('//div[@class="table_content"]/ul[@class="table_row"]/li/text()')
        # 将标题和值组合成一个字典，对应起来
        home_fee = dict(zip(titles, values))

        data_dict = {
        "房屋名称": home_name,
        "房屋价格": home_price,
        "房屋信息": home_info,
        "房屋设施": facility_names,
        "房屋费用": home_fee
        }
        return data_dict
    except IndexError:
        # 当 IndexError 被触发时，执行这里的代码
        print(f"无法提取 {detail_url} 的标题。跳过并继续。")
        return None  # 或者返回一个指示错误的值，如空字典 {}

# 数据保存至csv文件里（使用pandas中的to_csv保存）
def save_data(data):
    data_frame = pd.DataFrame(data,columns=['房屋名称','房屋价格','房屋信息','房屋设施','房屋费用'])
    #print(data_frame)
    data_frame.to_csv('beijing_fang111.csv',header=True,index=True,mode='a',encoding='utf_8_sig')


def main(page):
    print('开始爬取第{}页的数据！'.format(page))
    # choice_time = random.choice(range(0,5))
    # print(choice_time)
    
    urls = get_home_urls(page)
    data = []
    for url in urls:
        print('开始爬取详细网页为{}的房屋详细信息资料！'.format(url))
        all_data = get_home_detail_infos(detail_url=url)
        if all_data:
            data.append(all_data)
    save_data(data)

if __name__ == "__main__":
    #page = range(0,100)
    #print('爬虫开始')

    #pool = Pool(processes=4)
    #pool.map(main,page)
    # proxies = proxy.get_proxy_random()
    # pool.apply_async(main,args=(pagse,proxies,))
    #pool.close()
    #pool.join()

    #print(get_home_urls(pages=3))
    main(2)
    #print(get_home_detail_infos('https://bj.zu.ke.com//zufang/BJ1880555430480969728.html'))