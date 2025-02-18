
// Returning false here prevents Cypress from failing the test
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

// Following script hides unnecessary fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Import commands.js using ES2015 syntax:
import 'cypress-mochawesome-reporter/register';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')