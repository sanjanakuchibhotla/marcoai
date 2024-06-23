import requests
def get_ai_snippets_for_query(query): 
    headers = {"X-API-Key": "806a3761-5d05-4fbe-a303-806f5a394c41<__>1PTsFeETU8N2v5f4qmtDZVGS"} 
    params = {"query": query} 
    return requests.get(f"https://api.ydc-index.io/search?query={query}",params=params, headers=headers,).json()
query = "places to visit near san francisco"
print(get_ai_snippets_for_query("places to visit near san francisco"))

query = "places to visit near san francisco"
requests.get(f"https://api.ydc-index.io/search?query={query}",params=params, headers=headers,).json()
