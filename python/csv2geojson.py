# import pandas as pd
# import geopandas as gpd
# from shapely.geometry import Point

# # 读取CSV文件
# df = pd.read_csv('house_csv/wuhan_zufang.csv')

# # 假设你的CSV文件中有经度和纬度列，名为'longitude'和'latitude'
# # 创建一个新的GeoDataFrame
# geometry = [Point(xy) for xy in zip(df['longitude'], df['latitude'])]

# # 创建一个新的DataFrame，只包含特定的列的数据
# df_selected = df[['租房地址', '租房户型', '房屋价格', 'link']]

# # 创建一个新的GeoDataFrame，只包含特定的列的数据和地理信息
# gdf = gpd.GeoDataFrame(df_selected, geometry=geometry)

# # 将GeoDataFrame转换为GeoJSON
# gdf.to_file('geojson/二手全景房源数据.json', driver='GeoJSON')

import json
import pandas as pd

# # 加载 JSON 文件
# with open('geojson/二手房源数据.json', 'r', encoding='utf-8') as f:
#     data = json.load(f)

# # 将数据转换为 DataFrame
# df = pd.json_normalize(data['features'])

# # 重命名列
# df.rename(columns={'geometry.type': 'type','geometry.coordinates': 'coordinates', 'properties.小区名': '小区名', 'properties.区域': '区域', 'properties.户型': '户型', 'properties.面积': '面积', 'properties.朝向': '朝向', 'properties.装修风': '装修风', 'properties.楼层': '楼层', 'properties.房屋类': '房屋类', 'properties.价格': '价格', 'properties.备注': '备注', 'properties.链接': '链接', 'properties.latitude': 'latitude','properties.longitude': 'longitude'}, inplace=True)

# # 添加 ID 列
# df.insert(0, 'ID', range(1, 1 + len(df)))

# # 将 DataFrame 保存为 CSV
# df.to_csv('house_csv/wuhan_ershoufang24.csv', index=False, encoding='gbk')
