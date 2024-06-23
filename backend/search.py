# import langchain
# import os
# # The YDC_API_KEY and OPENAI_API_KEY should be defined in a .env file
# # Let's load the API keys in from the .env file
# import dotenv
# from langchain_community.retrievers.you import YouRetriever

# ydc_retriever = YouRetriever(num_web_results = 10)


# dotenv.load_dotenv(".env", override=True)

# # Let's test it out
# response = ydc_retriever.invoke("Has the inflation in Canada dropped in 2024?")
# # Let's take a look at the first 3 responses
# print(response[:3])   

import os

from langchain.retrievers.you import YouRetriever
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import dspy

load_dotenv()

os.environ["YDC_API_KEY"] = os.getenv('YOU_API_KEY')
os.environ["OPENAI_API_KEY"] = os.getenv('OPEN_AI_KEY')
yr = YouRetriever()
model = "gpt-4o-turbo-16k"
qa = RetrievalQA.from_chain_type(llm=ChatOpenAI(model=model), chain_type="stuff", retriever=yr)

# print(qa.run("how was the New York City pinball ban lifted?"))
response = yr.invoke("If you are in San Francisco for a trip, where could you go? Suggest affordable ideas and include prices.")
print(response[:3])  

turbo = dspy.OpenAI(model='gpt-4o')
# thread-safe built-in
dspy.settings.configure(lm=turbo)

class BasicQA(dspy.Signature):
    """Answer questions with wise suggestions"""

    question = dspy.InputField()
    answer = dspy.OutputField(desc="often between 40-50 words")

question = input("What is your question")

# Define the predictor.
generate_answer = dspy.Predict(BasicQA)

# Call the predictor on a particular input.
pred = generate_answer(question=question)

# Print the input and the prediction.
print(f"Question: {question}")
print(f"Predicted Answer: {pred.answer}")