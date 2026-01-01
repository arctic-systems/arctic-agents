from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel

from app.domain.companions import CompanionId


class CompanionColorOut(BaseModel):
    border: str
    glow: str
    fg: str
    subtle: str


class CompanionOut(BaseModel):
    id: CompanionId
    name: str
    about: str
    traits: Optional[List[str]] = None
    color: CompanionColorOut
