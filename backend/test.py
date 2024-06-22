import os

from langchain.retrievers.you import YouRetriever
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

os.environ["YDC_API_KEY"] = os.getenv('YOU_API_KEY')
os.environ["OPENAI_API_KEY"] = os.getenv('OPEN_AI_KEY')
yr = YouRetriever()
model = "gpt-3.5-turbo-16k"
qa = RetrievalQA.from_chain_type(llm=ChatOpenAI(model=model), chain_type="stuff", retriever=yr)

print(qa.run("how was the New York City pinball ban lifted?"))

