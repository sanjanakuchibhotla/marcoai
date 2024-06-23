import requests
import os
from dotenv import load_dotenv

load_dotenv()

def get_ai_snippets_for_query(query): 
    ydc_key = os.getenv('YOU_API_KEY')
    headers = {"X-API-Key": ydc_key} 
    params = {"query": query} 
    return requests.get(f"https://api.ydc-index.io/search?query={query}",params=params, headers=headers,).json()
query = "places to visit near san francisco"


result = get_ai_snippets_for_query("places to visit near san francisco")
print(result['hits'][0]['description'])
