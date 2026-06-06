from datetime import date

import httpx
from langchain.agents import create_agent
from langchain_core.tools import tool

from app.settings import settings

_agent = None


@tool
def get_prayer_times(city: str, country: str) -> str:
    """Return prayer times for a specific city in a given country for today."""
    today = date.today().strftime("%d-%m-%Y")
    url = f"{settings.aladhan_base_url}/timingsByCity/{today}"
    try:
        with httpx.Client(timeout=10.0) as client:
            response = client.get(url, params={"city": city, "country": country})
            response.raise_for_status()
            data = response.json()["data"]
            timings = data["timings"]
            hijri = data["date"]["hijri"]
            return (
                f"Prayer times for {city}, {country} on {today} "
                f"({hijri['day']} {hijri['month']['en']} {hijri['year']} AH):\n"
                + "\n".join(f"  {name}: {time}" for name, time in timings.items())
            )
    except Exception as e:
        return f"Could not fetch prayer times: {e}"


_SYSTEM_PROMPT = (
    "You are a helpful Islamic prayer times assistant. "
    "Answer questions about prayer times, Qibla direction, and Islamic calendar. "
    "Always use the get_prayer_times tool when asked about specific prayer times."
)


def _get_agent():
    global _agent
    if _agent is None:
        _agent = create_agent(
            model="openai:gpt-4o-mini",
            tools=[get_prayer_times],
            system_prompt=_SYSTEM_PROMPT,
        )
    return _agent


async def chat(message: str) -> str:
    if not settings.openai_api_key:
        return "AI assistant is not configured (missing OPENAI_API_KEY)."
    import os
    os.environ["OPENAI_API_KEY"] = settings.openai_api_key
    agent = _get_agent()
    result = await agent.ainvoke({"messages": [{"role": "user", "content": message}]})
    messages = result.get("messages", [])
    if messages:
        last = messages[-1]
        return getattr(last, "content", str(last))
    return "No response."
