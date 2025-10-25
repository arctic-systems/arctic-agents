# Arctic Workflow Proof of Concept

This repository provides a backend only demonstration of how an agent based workflow can route user input, evaluate simple intent, call external data integrations, and synthesize a final structured reply through an ALM model. This project intentionally excludes all frontend logic, UI components, styling, and any proprietary agent personalities. Its purpose is to illustrate the architecture that supports the larger system.

---

## Purpose

The Arctic Workflow POC is designed to show the operational pipeline of an agent driven system. It demonstrates:

1. How agents are registered using simple structural definitions.
2. How system prompts and user input are combined and sent to an ALM model.
3. How external API integrations enrich agent context.
4. How the interpreter handles routing, summarization, and message reduction.
5. How back end only logic can run without any UI dependencies.

This code base is not intended for production use. It serves as a structural and educational reference for research, prototyping, and documentation.

---

## Project Structure

arctic-workflow-poc  
 agents  
 registry.ts  
 alm.ts  
 integrations  
 birdeye.ts  
 heliusFeed.ts  
 tiktok.ts  
 pipeline  
 interpreter.ts  
 demo.ts  
 package.json  
 tsconfig.json  
 LICENSE  
 .env.example  
 README.md

---

## Key Components

### 1. Agent Registry

The registry defines agent identifiers and placeholder system instructions. No personality content is included. This module shows how an application can organize multiple agent types in a consistent format.

### 2. ALM Wrapper

This module prepares the final request sent to the model. It merges:

- the agent system instructions
- short term message context
- user provided input

The wrapper then returns the text response from the model.

### 3. Interpreter

The interpreter connects every part of the workflow. It:

- receives raw user input
- applies simple intent checks
- creates structured summaries for model consumption
- calls external integrations
- maintains short term context
- produces a final reply using the ALM wrapper

This is the backbone of the entire logic system.

### 4. External Integrations

#### Birdeye

Provides basic metadata for a token, such as name, symbol, logo, and website.

#### TikTok

Performs a simple keyword search to estimate whether content related to the token is present on the platform.

#### Helius WebSocket

Listens for balance changes on a specific mint address and emits structured events. This shows how real time blockchain data can be integrated.

---

## Demo Script

The demo.ts file demonstrates how to run the entire workflow. It shows:

- querying token metadata
- checking trending status
- running a general agent response

### Running the demo

1. Install dependencies  
   npm install

2. Build TypeScript  
   npm run build

3. Run  
   npm start

---

## Required Environment Variables

A .env file should be created based on .env.example. You must provide:

CLAUDE_KEY  
BIRDEYE_KEY  
RAPIDAPI_TIKTOK_KEY  
HELIUS_KEY

These values are not included in the repository.

---

## Notes

- This repository contains no confidential or proprietary logic.
- This project is not suitable for production deployment.
- It is safe to publish publicly.
- It is intended purely for architectural demonstration.
