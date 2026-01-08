# HappyPaws — Frontend UI

This repository contains the frontend UI for HappyPaws, a pet management dashboard built with React.

## Features

- Admin dashboard, owners, pets, veterinarians, and visits views
- Authentication context and protected routes
- Local JSON `db.json` for mock data during development

## Prerequisites

- Node.js (>= 14) and npm or yarn
- Optional: Git and GitHub CLI (`gh`) for repository tasks

## Setup

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start the development server:

```bash
npm start
# or
yarn start
```

The app will open at http://localhost:3000 by default.

## Build

```bash
npm run build
# or
yarn build
```

## Tests

Run the test suite with:

```bash
npm test
# or
yarn test
```

## Configuration

- API base URL: set `REACT_APP_API_URL` in a `.env` file if you have a backend. By default the app expects a local/mock API.

## Project Structure

- `src/` — React source files (components, pages, routes, services)
- `public/` — Static assets and `index.html`
- `db.json` — Mock data used for development

## Contributing

Feel free to open issues or create pull requests. For larger changes, open an issue first to discuss the design.

## License

This project has no license file. Add one if you plan to publish this repository.
