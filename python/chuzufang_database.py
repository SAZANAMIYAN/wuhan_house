import csv
import ast
import mysql.connector

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

# 设置数据库和表的字符集
cursor.execute("ALTER DATABASE house CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;")
cursor.execute("""
CREATE TABLE IF NOT EXISTS zufang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    house_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    type VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    location VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    room_count VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    orientation VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    house_price INT,
    area FLOAT,
    maintenance VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    move_in VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    floor VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    elevator BOOLEAN,
    parking VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    water_supply VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    electricity_supply VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    gas BOOLEAN,
    heating VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    rental_period VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    viewing_time VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    payment_method VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    deposit INT,
    service_fee VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    agency_fee VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    amenities VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    longitude FLOAT,
    latitude FLOAT
);
""")

# 打开CSV文件
with open('wuhan_zufang.csv', mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)

    for row in csv_reader:
        house_name = row['房屋名称']
        house_price = int(row['房屋价格'])
        house_info = ast.literal_eval(row['房屋信息'])
        amenities = ast.literal_eval(row['房屋设施'])
        payment_info = ast.literal_eval(row['房屋费用'])
        longitude=float(row['longitude'])
        latitude = float(row['latitude'])

        basic_info_dict = {}
        for item in house_info:
            if '：' in item:
                key, value = item.split('：', 1)
                basic_info_dict[key.strip()] = value.strip()

        payment_info_dict = {key.strip(): value.strip() for key, value in payment_info.items()}

        # 拆解房屋名称字段
        print(f"拆解前的房屋名称: {house_name}")
        type_location_parts = house_name.split('·')
        print(f"拆分后的 type_location_parts: {type_location_parts}")
        house_type = type_location_parts[0].strip()  # 合租
        location_room = type_location_parts[1].strip()  # 东亭黄鹂苑 4居室 西北卧

        location_room_parts = location_room.split(' ')
        print(f"拆分后的 location_room_parts: {location_room_parts}")
        location = location_room_parts[0]  # 东亭黄鹂苑
        if len(location_room_parts) > 1:
            room_count = location_room_parts[1]  # 4居室
        else:
            room_count = ''  # 或者其他默认值

        if len(location_room_parts) > 2:
            orientation = location_room_parts[2]  # 南卧
        else:
            orientation = ''  # 或者其他默认值

        # 将 amenities 列表转换为字符串
        amenities_str = ', '.join(amenities)

        # 在插入语句中添加 type 字段，并将 house_type 作为值插入
        rental_info_sql = """
        INSERT INTO zufang (
            house_name, type, location, room_count, orientation, house_price, area, maintenance, move_in, floor,
            elevator, parking, water_supply, electricity_supply, gas, heating, rental_period, viewing_time, payment_method,
            deposit, service_fee, agency_fee, amenities,longitude,latitude
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        rental_info_values = (
            house_name, house_type, location, room_count, orientation, house_price,
            float(basic_info_dict.get('面积', '0㎡').replace('㎡', '')),
            basic_info_dict.get('维护', ''), basic_info_dict.get('入住', ''), basic_info_dict.get('楼层', ''),
            basic_info_dict.get('电梯', '') == '有', basic_info_dict.get('车位', ''), basic_info_dict.get('用水', ''),
            basic_info_dict.get('用电', ''), basic_info_dict.get('燃气', '') == '有', basic_info_dict.get('采暖', ''),
            basic_info_dict.get('租期', ''), basic_info_dict.get('看房', ''), payment_info_dict.get('付款方式', ''),
            int(payment_info_dict.get('押金', 0)), payment_info_dict.get('服务费', ''),
            payment_info_dict.get('中介费', ''), amenities_str, longitude, latitude
        )
        cursor.execute(rental_info_sql, rental_info_values)
       # # 获取刚刚插入的 rent 表记录的 id 值
       #  rental_info_id = cursor.lastrowid

        # # 插入设施信息到 rent_Amenities 表中
        # for amenity in amenities:
        #     amenity_insert_sql = """
        #     INSERT INTO rent_Amenities (rental_info_id, amenity)
        #     VALUES (%s, %s)
        #     """
        #     cursor.execute(amenity_insert_sql, (rental_info_id, amenity))

# 提交事务
conn.commit()

# 关闭连接
cursor.close()
conn.close()
