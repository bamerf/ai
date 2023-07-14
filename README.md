# AI powered knowledge base

## Overview

This repository contains a Next.js application that utilizes LangChain.js, Pinecone Database, and OpenAI's GPT-3.5 Turbo API. The main intent of this project is to supply necessary information to chat GPT, store it in a long-term memory (Pinecone vector DB), and then use it as a knowledge base to provide useful responses.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [LangChain.js](https://github.com/hwchase17/langchain)
- [Pinecone Database](https://www.pinecone.io/)
- [OpenAI API (GPT-3.5 Turbo)](https://platform.openai.com/docs/guides/chat/)
- [Knowledge base](https://support.corellium.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js
- Yarn
- Pinecone API key
- OpenAI API key

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```

2. Install dependencies

   ```sh
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your credentials for _pinecone_ and _openAI_.

4. Put all necessary files in the `docs` directory. and run

   ```sh
   yarn generate-embeddings-pinecone
   ```

5. Run the development server

   ```sh
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Now you should be able to ask knowledge base relevant questions and get right answers.
