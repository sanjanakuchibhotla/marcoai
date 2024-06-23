import requests
import os
from dotenv import load_dotenv

load_dotenv()


def get_ai_snippets_for_query(query):
    ydc_api_key = os.getenv('YOU_API_KEY')
    headers = {"X-API-Key": ydc_api_key}
    params = {"query": query}
    return requests.get(f"https://api.ydc-index.io/search?query={query}",params=params,headers=headers,).json()
query = "places to visit in a 10 mile radius of union square sf based on my love for food"


result = get_ai_snippets_for_query("places to visit near san francisco")
print(result['hits'][0]['description'])
