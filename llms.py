UNI_PROMPT="你是一个房源评估专家，请你结合我给出的房源信息，出具结构化评估报告，多角度判断该房源"

from zhipuai import ZhipuAI
import requests
import json
from sparkai.llm.llm import ChatSparkLLM, ChunkPrintHandler
from sparkai.core.messages import ChatMessage
import re
import sys

def zhipu(prompt):
    client = ZhipuAI(api_key="bfbe4f4219ef0a32da4924131fa0c2e7.0ux2GjLWXgmlIGMI") # 填写您自己的APIKey
    response = client.chat.completions.create(
        model="glm-4",  # 填写需要调用的模型名称
        messages=[
            {"role": "user", "content": UNI_PROMPT},
            {"role": "user", "content": prompt},
            {"role": "user", "content": "ATTENTION!!! 你不能向我询问更多信息，而应该直接生成答案"}
            # {"role": "user", "content": "创造一个更精准、吸引人的slogan"}
        ],
    )
    return response


def tongyi(prompt):
    headers = {
        'Authorization': 'Bearer sk-2bf30898e0c4448194123f85ea9a8b59',#这里替换你的密钥
        'Content-Type': 'application/json',
    }

    json_data = {
        'model': 'qwen-1.8b-chat',
        'input': {
            'messages': [
                {
                    'role': 'system',
                    'content': 'You are a helpful assistant.',
                },
                {
                    'role': 'user',
                    'content': str(prompt),
                },
            ],
        },
        'parameters': {},
    }

    response = requests.post(
        'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
        headers=headers,
        json=json_data,
    )

    content = response.json()
    last_text=content


    return last_text


#星火认知大模型Spark3.5 Max的URL值，其他版本大模型URL值请前往文档（https://www.xfyun.cn/doc/spark/Web.html）查看
SPARKAI_URL = 'wss://spark-api.xf-yun.com/v3.5/chat'
#星火认知大模型调用秘钥信息，请前往讯飞开放平台控制台（https://console.xfyun.cn/services/bm35）查看
SPARKAI_APP_ID = '0d50b13b'
SPARKAI_API_SECRET = 'YTA4MGU0OTlkMWMyOTk3M2NjYTNkNDc4'
SPARKAI_API_KEY = 'ce413a08d215a925a3e39ae1a99b373c'
#星火认知大模型Spark3.5 Max的domain值，其他版本大模型domain值请前往文档（https://www.xfyun.cn/doc/spark/Web.html）查看
SPARKAI_DOMAIN = 'generalv3.5'

def spark(prompt):
    spark = ChatSparkLLM(
        spark_api_url=SPARKAI_URL,
        spark_app_id=SPARKAI_APP_ID,
        spark_api_key=SPARKAI_API_KEY,
        spark_api_secret=SPARKAI_API_SECRET,
        spark_llm_domain=SPARKAI_DOMAIN,
        streaming=False,
    )
    
    messages = [ChatMessage(
        role="user",
        content=UNI_PROMPT+prompt+"ATTENTION!!! 你不能向我询问更多信息，而应该直接生成答案"
    )]
    handler = ChunkPrintHandler()
    #a = spark.generate([messages], callbacks=[handler])
    
    a = spark.generate([messages])
    for response in a.generations:
        return (response[0].text)

    
def evaluate_house(model, house_info):
    # 在这里编写你的评估逻辑
    if model=='spark':
        ans=spark(house_info)
    else:
        ans=zhipu(house_info)

    return ans


if __name__ == "__main__":
    model = sys.argv[1]
    house_info_text = sys.argv[2]
    # 确保解码后的字符串是 UTF-8 编码
    result = evaluate_house(model, house_info_text)
    #print(result.encode('utf-8').decode('utf-8'))  # 确保输出结果是 UTF-8 编码
    print(result)  # 确保输出结果是 UTF-8 编码

    #print(evaluate_house(spark, "你好"))