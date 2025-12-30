from __future__ import annotations

from typing import Literal, TypedDict, List, NotRequired

CompanionId = Literal["cinder", "velvet", "vector", "morrow", "quill"]


class CompanionColor(TypedDict):
    border: str
    glow: str
    fg: str
    subtle: str


class Companion(TypedDict):
    id: CompanionId
    name: str
    about: str
    traits: NotRequired[List[str]]
    color: CompanionColor


COMPANIONS: List[Companion] = [
    {
        "id": "cinder",
        "name": "Cinder",
        "about": "Violently blunt. Helpful like a grease fire.",
        "traits": ["rage", "direct", "fast", "no-chill"],
        "color": {
            "border": "border-red-500/40",
            "glow": "shadow-red-900/30",
            "fg": "text-red-200",
            "subtle": "text-red-200/70",
        },
    },
    {
        "id": "velvet",
        "name": "Velvet",
        "about": "Warm on the surface. Barely holding it together.",
        "traits": ["support", "manic-kindness", "spiral"],
        "color": {
            "border": "border-pink-400/40",
            "glow": "shadow-pink-900/20",
            "fg": "text-pink-200",
            "subtle": "text-pink-200/70",
        },
    },
    {
        "id": "vector",
        "name": "Vector",
        "about": "Correctness-obsessed. Kernel panic energy.",
        "traits": ["technical", "precise", "tradeoffs", "segfault"],
        "color": {
            "border": "border-cyan-500/40",
            "glow": "shadow-cyan-900/25",
            "fg": "text-cyan-200",
            "subtle": "text-cyan-200/70",
        },
    },
    {
        "id": "morrow",
        "name": "Morrow",
        "about": "Prophetic pattern-seer. Quiet menace.",
        "traits": ["reflective", "prophetic", "minimal", "dread"],
        "color": {
            "border": "border-purple-500/40",
            "glow": "shadow-purple-900/25",
            "fg": "text-purple-200",
            "subtle": "text-purple-200/70",
        },
    },
    {
        "id": "quill",
        "name": "Quill",
        "about": "Pedantic to the point of madness. Footnotes forever.",
        "traits": ["pedantic", "edge-cases", "definitions", "footnotes"],
        "color": {
            "border": "border-yellow-500/40",
            "glow": "shadow-yellow-900/20",
            "fg": "text-yellow-200",
            "subtle": "text-yellow-200/70",
        },
    },
]


def get_companion(companion_id: CompanionId) -> Companion:
    for c in COMPANIONS:
        if c["id"] == companion_id:
            return c
    raise KeyError(f"Unknown companion_id: {companion_id}")
