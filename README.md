# Cypress Template Repository

A boilerplate setup for Cypress end-to-end testing, designed for quick integration and scalability.

## Features
- Preconfigured Cypress setup for efficiency
- Modular test structure for maintainability
- Custom commands and reusable utility functions
- Sample test cases for quick reference

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/zahinX/cy_template.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
- Run tests in interactive mode:
  ```sh
  npm run cyo
  ```
- Execute tests in headless mode:
  ```sh
  npm run cyr
  ```
- Check available scripts in `package.json` for additional commands.

## Folder Structure
```
├── cypress/
│   ├── e2e/          # Test cases
│   ├── fixtures/     # Mock data
│   ├── reports/      # Contains report generated after headless execution (pun intended)
│   ├── support/      # Custom commands & utilities
├── cypress.config.js # Cypress configuration
├── package.json      # Dependencies & scripts
```

## Contributing
Feel free to fork and submit PRs to improve this template.