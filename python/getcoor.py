import requests
import pandas as pd

# 读取CSV文件
df = pd.read_csv('house_csv/wuhan_zufang_split.csv')

# 百度地图API的ak
ak = '7TZgZ5jf6L0H14Z3xAzz7OR0rGqIFGZH'

# 创建新的列来存储经纬度信息
df['longitude'] = ''
df['latitude'] = ''

for i in range(len(df)):
    # 获取地址名称
    address = df.loc[i, '租房地址']

    # 构造请求URL
    url = f'http://api.map.baidu.com/geocoding/v3/?address={address}&output=json&ak={ak}&city=武汉市'

    # 发送请求
    response = requests.get(url)

    # 解析响应
    data = response.json()

    # 获取经纬度信息
    longitude = data['result']['location']['lng']
    latitude = data['result']['location']['lat']

    # 将经纬度信息添加到DataFrame
    df.loc[i, 'longitude'] = longitude
    df.loc[i, 'latitude'] = latitude

# 保存DataFrame
df.to_csv('house_csv/wuhan_zufang_coordinates.csv', index=False, encoding='utf_8_sig')