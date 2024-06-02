import csv
import ast
import mysql.connector
import pandas as pd
import json

# 连接到数据库
conn = mysql.connector.connect(
    host='localhost',
    port='3306',
    user='root',
    password='123456',
    database='house',
    charset='utf8mb4'
)

# 设置数据库和表的字符集
cursor = conn.cursor()
cursor.execute("ALTER DATABASE house CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;")
cursor.execute("""
CREATE TABLE IF NOT EXISTS ershoufang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    community_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    total_price VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    unit_price VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    house_type VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    floor VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    area VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    layout_structure VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    inner_area VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    building_type VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    orientation VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    structure VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    decoration VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    elevator_ratio VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    elevator VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    floor_height VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    core_selling_point TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    community_introduction TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    surrounding_support TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    transportation TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);
""")

# 读取 CSV 文件
df = pd.read_csv('wuhan_ershoufang.csv')

# 逐行处理数据并插入到数据库中
for index, row in df.iterrows():
    address = ast.literal_eval(row['所在地址'])
    community_name = ast.literal_eval(row['小区名称'])
    total_price = ast.literal_eval(row['总价格'])
    unit_price = ast.literal_eval(row['单价'])
    basic_info = ast.literal_eval(row['房屋基本信息'])
    features = ast.literal_eval(row['房屋特色'])

    house_type = basic_info.get('房屋户型', '暂无数据')
    floor = basic_info.get('所在楼层', '暂无数据')
    area = basic_info.get('建筑面积', '暂无数据')
    layout_structure = basic_info.get('户型结构', '暂无数据')
    inner_area = basic_info.get('套内面积', '暂无数据')
    building_type = basic_info.get('建筑类型', '暂无数据')
    orientation = basic_info.get('房屋朝向', '暂无数据')
    structure = basic_info.get('建筑结构', '暂无数据')
    decoration = basic_info.get('装修情况', '暂无数据')
    elevator_ratio = basic_info.get('梯户比例', '暂无数据')
    elevator = basic_info.get('配备电梯', '暂无数据')
    floor_height = basic_info.get('楼层高度', '暂无数据')
    core_selling_point = features.get('核心卖点', '暂无数据')
    community_introduction = features.get('小区介绍', '暂无数据')
    surrounding_support = features.get('周边配套', '暂无数据')
    transportation = features.get('交通出行', '暂无数据')

    # 将列表转换成字符串
    address_str = ', '.join(address)
    community_name_str = ', '.join(community_name)
    total_price_str = ', '.join(total_price)
    unit_price_str = ', '.join(unit_price)

    cursor.execute("""
    INSERT INTO ershoufang (
        address, community_name, total_price, unit_price, house_type, floor,
        area, layout_structure, inner_area, building_type, orientation, structure,
        decoration, elevator_ratio, elevator, floor_height, core_selling_point,
        community_introduction, surrounding_support, transportation
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (address_str, community_name_str, total_price_str, unit_price_str, house_type, floor,
          area, layout_structure, inner_area, building_type, orientation, structure,
          decoration, elevator_ratio, elevator, floor_height, core_selling_point,
          community_introduction, surrounding_support, transportation))

# 提交事务并关闭连接
conn.commit()
cursor.close()
conn.close()
