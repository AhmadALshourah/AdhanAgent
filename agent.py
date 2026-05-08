from langchain.agents import initialize_agent, AgentType ,tool
"initialize_agent: build my own agent"
"tool: fro llm to know that funchion is used for it"
from langchain.chat_models import ChatOpenAI
import requests
import json
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

model = ChatOpenAI(model="gpt-4-1106-preview")

@tool
def get_pray_time(city, country):
    """

    Return pray time for a specific city in a given country,\
    The input should always be two strings first one for the city \
    and the second one for the country, \
    and this function will always return pray time. \
    """

    respones = requests.get("https://api.aladhan.com/v1/timingsByCity/19-02-2025?city="+ city +"&country="+ country)
    return json.dumps(respones.text)

agent = initialize_agent(
    [get_pray_time],
    model,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose = True
)
result = agent.run("what is the Fajr pray time in kazaplanka in Morocco") #Example!
print(result)
