# code-quality-checker

## Setup project

- Install NodeJS `v22.12.0`

  - Either by installing it directly on your machine
  - Or by using `nvm` and run `nvm use` at this directory.

- Clone this repository on your machine
- Install packages via `npm ci`

## Scripts

- `build`: Build the React project
- `client`: Run the React only, Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- `dev`: Run both `client` and `server` script concurrently.
- `dev:w`: Same as `dev` but in addition to watch changes
- `server`: Run the server project, Open [http://localhost:5000](http://localhost:5000) to view it in your browser.
- `server:w`: Same as `server` but in addition to watch changes

## ChatGPT

We're using the free tier of OpenAI, so you need to add the `OPENAI_API_KEY` to `.env` file first

- Login to (OpenAI)[https://platform.openai.com/login]
- Add your details
- Copy the API Key generated
- Started using the application
