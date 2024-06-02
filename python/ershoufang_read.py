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
CREATE TABLE IF NOT EXISTS wuhan_ershoufang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    house_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    address VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    room_type VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    area VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    orientation VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    decoration_style VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    floor VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    house_type VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    price VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    note VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    link VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    longitude FLOAT,
    latitude FLOAT
);
""")

# 读取CSV文件并插入数据
with open('C:\\ProgramData\\MySQL\\MySQL Server 5.7\\Uploads\\wuhan_ershoufang_new.csv', mode='r', encoding='gbk') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)  # 跳过表头
    for row in csv_reader:
        cursor.execute("""
            INSERT INTO wuhan_ershoufang (house_name, address, room_type, area, orientation, decoration_style, floor, house_type, price, note, link, longitude, latitude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, row[1:])

# 提交事务
conn.commit()

# 关闭游标和连接
cursor.close()
conn.close()

print("数据插入成功！")
