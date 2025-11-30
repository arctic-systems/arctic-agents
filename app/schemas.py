from pydantic import BaseModel, Field
from typing import List, Optional

class Message(BaseModel):
    role: str = Field(description='"system" | "user" | "assistant"')
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    max_new_tokens: Optional[int] = None
    temperature: Optional[float] = None
    top_p: Optional[float] = None
    stop: Optional[List[str]] = None

class ChatResponse(BaseModel):
    content: str
