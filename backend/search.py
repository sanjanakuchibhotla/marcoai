import os
import json
from langchain_core.documents import Document
from typing import TYPE_CHECKING, Any, Dict, List, Optional
from langchain.retrievers.you import YouRetriever
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import data
import dspy

load_dotenv()

os.environ["YDC_API_KEY"] = os.getenv('YOU_API_KEY')
os.environ["OPENAI_API_KEY"] = os.getenv('OPEN_AI_KEY')


userPreference = input("Do you have ideas for an adventure?\n")
location = input("Where are you located?\n")

prefs = {k: v for k, v in sorted(data.adventure_ratings.items(), key=lambda item: item[1]["average_rating"], reverse=True)}
prefsList = prefs.keys()
userLikes = "The user enjoys, from most to least, " + ', '.join(prefsList) + '.'
searchPrompt = userLikes + " The user inputted the following for their ideas: " + userPreference + "\n Can you give suggestions near " + location + " ? Return a json string where each suggestion has the following format that I can turn into python: {Place: string; City: string; Description: string; Distance: number; Price: (range from $ to $$$$); Resources/Links: string} "

yr = YouRetriever()
model = "gpt-4o"
qa = RetrievalQA.from_chain_type(llm=ChatOpenAI(model=model), chain_type="stuff", retriever=yr)
data = qa.run(searchPrompt)
data = data.strip('json\n')
print(data)

# json.loads(data)

# s
def generateSearch(dictionary):
    for v in dictionary:
        print(v)

# generateSearch(data)