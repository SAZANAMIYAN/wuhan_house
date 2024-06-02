import mysql.connector
import csv
import ast

# 连接到数据库
conn = mysql.connector.connect(
    host='localhost',
    port='3306',
    user='root',
    password='123456',
    database='house',
    charset='utf8mb4'
)

cursor = conn.cursor()

# 创建表
cursor.execute("""
CREATE TABLE IF NOT EXISTS xinfang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    house_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    house_price VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    address VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    room_types VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    url VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    longitude FLOAT,
    latitude FLOAT
);
""")

# 打开文件并读取数据
with open('E:\\Desktop\\practice1\\wuhan_xinfang_coordinates.csv', mode='r', encoding='utf-8') as file:
    reader = csv.reader(file)
    next(reader)  # 跳过标题行
    for parts in reader:
        try:
            house_name = ast.literal_eval(parts[1])[0]
            house_price = parts[2]
            address = parts[3]
            room_types = ', '.join(ast.literal_eval(parts[4]))
            url = parts[5]
            longitude = float(parts[6])
            latitude = float(parts[7])

            # 插入数据到 xinfang 表中
            cursor.execute("""
            INSERT INTO xinfang (house_name, house_price, address, room_types, url, longitude, latitude)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (house_name, house_price, address, room_types, url, longitude, latitude))

        except (ValueError, IndexError, SyntaxError) as e:
            print(f"处理行时出错: {parts}，错误: {e}")
            continue

# 提交事务
conn.commit()

# 关闭连接
cursor.close()
conn.close()
