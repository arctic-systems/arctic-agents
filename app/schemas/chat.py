from __future__ import annotations

from typing import Literal, List
from pydantic import BaseModel, Field

Role = Literal["user", "assistant"]


class ChatMsg(BaseModel):
    role: Role
    content: str = Field(min_length=1)


class ChatRequest(BaseModel):
    messages: List[ChatMsg] = Field(min_length=1)


class ChatResponse(BaseModel):
    companion_id: str
    model: str
    text: str
