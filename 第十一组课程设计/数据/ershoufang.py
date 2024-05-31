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
    base_url = 'https://bj.ke.com/ershoufang/'
    page_url = 'https://bj.ke.com/ershoufang/pg{}'
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
            detail_urls = html.xpath('//ul[@class="sellListContent"]//li[@class="clear"]/a/@href')
            all_detail_urls.extend(detail_urls)
            
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
    # 解析获取相关数据
    # 所在地址
    home_location = html.xpath('//div[@data-component="overviewIntro"]//div[@class="content"]//div[@class="areaName"]/span[@class="info"]/a/text()')
    # 小区名称
    local_name = html.xpath('//div[@data-component="overviewIntro"]//div[@class="content"]//div[@class="communityName"]/a/text()')[0]
    # 总价格
    total_price = html.xpath('//div[@data-component="overviewIntro"]//div[@class="content"]//div[@class="price "]/span[@class="total"]/text()')[0]
    # 单价
    unit_price = html.xpath('//div[@data-component="overviewIntro"]//div[@class="content"]//div[@class="price "]//div[@class="unitPrice"]/span/text()')[0]
    # 房屋基本信息
    home_style = html.xpath('//div[@class="introContent"]//div[@class="base"]//div[@class="content"]/ul/li/text()')
    # 房屋交易属性信息
    transaction_info = html.xpath('//div[@class="introContent"]//div[@class="transaction"]//div[@class="content"]/ul/li/text()')
    # 小区均价
    xiaoqu_price = html.xpath('//div[@class="xiaoquCard"]//div[@class="xiaoqu_main fl"]//span[@class="xiaoqu_main_info price_red"]/text()')[0].replace(' ','')
    # 小区建造时间
    xiaoqu_built_time = html.xpath('//div[@class="xiaoquCard"]//div[@class="xiaoqu_main fl"]//span[@class="xiaoqu_main_info"]/text()')[0].replace(' ','').replace('\n','')
    # 小区建筑类型
    xiaoqu_built_style = html.xpath('//div[@class="xiaoquCard"]//div[@class="xiaoqu_main fl"]//span[@class="xiaoqu_main_info"]/text()')[1].replace(' ','').replace('\n','')
    # 小区楼层总数
    xiaoqu_total_ceng = html.xpath('//div[@class="xiaoquCard"]//div[@class="xiaoqu_main fl"]//span[@class="xiaoqu_main_info"]/text()')[2].replace(' ','').replace('\n','')
    # 房源特色
    # 使用xpath定位所有具有"baseattribute clear"类的元素
    base_attributes = html.xpath('//div[contains(@class, "baseattribute clear")]')
    # 创建一个空列表来存储提取的数据
    home_characters = []
    # 遍历找到的每个元素
    for element in base_attributes:
        # 提取name和content属性的值
        name = element.xpath('.//div[@class="name"]/text()')[0]
        content = element.xpath('.//div[@class="content"]/text()')[0].strip()
        # 将提取的数据添加到列表中
        home_characters.append({'name': name, 'content': content})
    
    data_dict = {
    "所在地址": home_location,
    "小区名称": local_name,
    "总价格": total_price,
    "单价": unit_price,
    "房屋基本信息": home_style,
    "房屋交易属性信息": transaction_info,
    "房屋特色": home_characters,
    "小区均价": xiaoqu_price,
    "小区建造时间": xiaoqu_built_time,
    "小区建筑类型": xiaoqu_built_style,
    "小区楼层总数": xiaoqu_total_ceng
    }
    return data_dict

def clean_data(data):
    # 对于简单的字符串，直接清理两端的空白字符
    data['小区名称'] = data['小区名称'].strip()

    data['总价格'] = data['总价格'].strip()
    data['单价'] = data['单价'].strip()

    data['小区均价'] = data['小区均价'].strip()
    data['小区建造时间'] = data['小区建造时间'].strip()
    data['小区建筑类型'] = data['小区建筑类型'].strip()
    data['小区楼层总数'] = data['小区楼层总数'].strip()

    # 对于列表类型的数据，清理每个元素的空白字符，并移除空元素
    data['所在地址'] = [item.strip() for item in data['所在地址'] if item.strip()]
    data['房屋基本信息'] = [item.strip() for item in data['房屋基本信息'] if item.strip()]
    data['房屋交易属性信息'] = [item.strip() for item in data['房屋交易属性信息'] if item.strip()]

    return data

# 数据保存至csv文件里（使用pandas中的to_csv保存）
def save_data(data):
    data_frame = pd.DataFrame(data,columns=['所在地址','小区名称','总价格','单价','房屋基本信息','房屋交易属性信息','小区均价','小区建造时间','小区建筑类型','小区楼层总数','房屋特色'])
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
        all_data = clean_data(all_data)
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
    main(1)