import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

# 读取CSV文件
df = pd.read_csv('house_csv/wuhan_xinfang.csv')

# 假设你的CSV文件中有经度和纬度列，名为'longitude'和'latitude'
# 创建一个新的GeoDataFrame
geometry = [Point(xy) for xy in zip(df['longitude'], df['latitude'])]

# 创建一个新的DataFrame，只包含特定的列的数据
df_selected = df[['楼盘名称', '楼盘价格', '楼盘位置', '楼盘户型','link']]

# 创建一个新的GeoDataFrame，只包含特定的列的数据和地理信息
gdf = gpd.GeoDataFrame(df_selected, geometry=geometry)

# 将GeoDataFrame转换为GeoJSON
gdf.to_file('geojson/新房源数据.json', driver='GeoJSON')