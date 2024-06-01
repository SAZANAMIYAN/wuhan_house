# import pandas as pd

# # 读取CSV文件
# df = pd.read_csv('house_csv/wuhan_zufang.csv')

# # 先用'·'进行拆分
# df['租赁方式'], df['剩余部分'] = df['房屋名称'].str.split('·', 1).str

# # 再对'剩余部分'用第一个空格进行拆分
# df['租房地址'], df['租房户型'] = df['剩余部分'].str.split(' ', 1).str

# # 删除原来的'房屋名称'列和'剩余部分'列
# df = df.drop(columns=['房屋名称', '剩余部分'])

# # 保存DataFrame
# df.to_csv('house_csv/wuhan_zufang_split.csv', index=False, encoding='utf_8_sig')

import pandas as pd

# 读取CSV文件
df = pd.read_csv('house_csv/wuhan_ershoufang.csv')

# 添加新的列
df['link'] = 'http://beyond.3dnest.cn/survey/?m=zhq_hxdcspgq_440&from=singlemessage&isappinstalled=0'

# 将DataFrame写回到CSV文件
df.to_csv('house_csv/wuhan_ershoufang.csv', index=False, encoding='utf_8_sig')