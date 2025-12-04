from swarms import Agent

# Hard-coded to match Arctic registry IDs
# NOTE: These are NOT your proprietary personalities.
# They simply load whatever TS registry passes in.

def build_swarms_agent(id: str, label: str, system_prompt: str):
    """
    Creates a Swarms Agent using Arctic agent identity.
    """
    return Agent(
        agent_name=label,
        system_prompt=system_prompt,
        model_name="gpt-4o-mini",
        max_loops=1,
    )
