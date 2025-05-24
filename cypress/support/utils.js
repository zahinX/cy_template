
/**
 * @author Zahin Ahad
*/

export default class Utils{

    /**
     * Clears the cookies
     * @returns {void}
     */
    clearAllCookies(){
        cy.clearAllCookies()
        this.actionLog('All cookies cleared')
    }

    /**
     * Clears the local storage
     * @returns {void}
     */
    clearAllLocalStorage(){
        cy.clearAllLocalStorage()
        this.actionLog('Local storage cleared')
    }

    /**
     * Clears the session storage
     * @returns {void}
     */
    clearAllSessionStorage(){
        cy.clearAllSessionStorage()
        this.actionLog('Session storage cleared')
    }

    /**
     * Clears the cookies, local storage & session storage
     * @returns {void}
     */
    clearAllStorage(){
        this.clearAllCookies()
        this.clearAllLocalStorage()
        this.clearAllSessionStorage()
        this.actionLog('All storage cleared')
    }

    /**
     * Visits page for the given URL
     * @param {string} url - The URL to visit
     * @returns {void}
     */
    visitPage(url){
        this.actionLog(`Visiting "${url}"`)
        cy.visit(url)
    }

    /**
     * Enters text into an input field
     * @param {string} selector - The selector for the input field
     * @param {string} text - The text to enter into the field
     * @returns {void}
     */
    typeText(selector, text) {
        cy.get(selector).clear().type(text)
        this.actionLog(`Typed "${text}" into element`)
    }

    /**
     * Enters text into an input field
     * @param {string} selector - The selector for the input field
     * @param {string} pass - The password to enter into the field
     * @returns {void}
     */
    typePass(selector, pass) {
        cy.get(selector).clear().type(pass)
        this.actionLog(`Typed password in the field`)
    }

    /**
     * Clicks a button or element containing the specified text
     * @param {string} text - The text of the button or element to click
     * @returns {void}
     */
    clickButtonByText(text) {
        this.actionLog(`Clicking element with the text "${text}"`)
        cy.contains(text).click()
        this.actionLog(`Clicked on "${text}"`)
    }

    /**
     * Clicks a button or element containing the specified text
     * @param {string} text - The text of the button or element to click
     * @returns {void}
     */
    clickButtonByLocator(locator) {
        this.actionLog(`Clicking element with the locator "${locator}"`)
        cy.get(locator).click()
        this.actionLog(`Clicked on element`)
    }

    /**
     * Click an element by data-test-id.
     * @param {string} testId - The value of the data-test-id attribute
     * @returns {void}
     */
    clickElementByTestId(testId) {
        cy.get(`[data-test-id="${testId}"]`).click();
    }

    /**
     * Clicks first button or element from many elements
     * @param {string} text - The text of the button or element to click
     * @returns {void}
     */
    clickFirstElem(locator) {
        this.actionLog(`Clicking first element with the locator "${locator}"`)
        cy.get(locator).first().click()
        this.actionLog(`Clicked on first element`)
    }

    /**
     * Clicks last button or element from many elements
     * @param {string} text - The text of the button or element to click
     * @returns {void}
     */
    clickLastElem(locator) {
        this.actionLog(`Clicking last element with the locator "${locator}"`)
        cy.get(locator).last().click()
        this.actionLog(`Clicked on last element`)
    }

    /**
     * Intercepts a network request.
     * @param {string} method - The HTTP method (e.g., 'POST')
     * @param {string} urlPattern - The URL pattern to intercept
     * @param {string} alias - The alias to assign to the intercepted request
     * @returns {void}
     */
    interceptRequest(method, urlPattern, alias) {
        this.logMessage(`Intercepting ${method} request for pattern "${urlPattern}" as "${alias}"`)
        cy.intercept(method, urlPattern).as(alias)
    }
    
    /**
     * Intercepts a GET network request.
     * @param {string} urlPattern - The URL pattern to intercept
     * @param {string} alias - The alias to assign to the intercepted request
     * @returns {void}
     */
    interceptGetRequest(urlPattern, alias) {
        this.interceptRequest('GET', urlPattern, alias)
    }

    /**
     * Intercepts a POST network request.
     * @param {string} urlPattern - The URL pattern to intercept
     * @param {string} alias - The alias to assign to the intercepted request
     * @returns {void}
     */
    interceptPostRequest(urlPattern, alias) {
        this.interceptRequest('POST', urlPattern, alias)
    }

    /**
     * Waits for the intercepted request to complete and logs the response
     * @param {string} alias - The alias of the intercepted request
     * @returns {void}
     */
    logResponse(alias) {
        cy.wait(`@${alias}`).then( res => {
            this.logMessage(res)
        })
    }

    /**
     * Waits for the intercepted request to complete and checks the status code
     * @param {string} alias - The alias of the intercepted request
     * @param {number} statusCode - The expected status code of the response
     * @returns {void}
     */
    waitForResponseStatusCode(alias, statusCode) {
        cy.wait(`@${alias}`).its('response.statusCode').should('eq', statusCode)
        this.assertionLog(`Verified status code "${statusCode}" for intercepted request "${alias}"`)
    }

    /**
     * Waits for the intercepted request to complete and checks the status message
     * @param {string} alias - The alias of the intercepted request
     * @param {number} statusMsg - The expected status message of the response
     * @returns {void}
     */
    waitForResponseStatusMessage(alias, statusMsg) {
        cy.wait(`@${alias}`).its('response.statusMessage').should('eq', statusMsg)
        this.assertionLog(`Verified status message "${statusMsg}" for intercepted request "${alias}"`)
    }

    /**
     * Waits for the intercepted request to complete and checks the status message
     * @param {string} alias - The alias of the intercepted request
     * @param {number} statusCode - The expected status message of the response
     * @param {number} statusMsg - The expected status message of the response
     * @returns {void}
     */
    waitForResponseStatusCodeAndMessage(alias, statusCode, statusMsg) {
        cy.wait(`@${alias}`)
          .its('response.statusCode').should('eq', statusCode)
          .and('response.statusMessage').should('eq', statusMsg)
        this.assertionLog(`Verified status code "${statusCode}" and status message "${statusMsg}" for intercepted request "${alias}"`)
    }

    /**
     * Verifies the status code of the intercepted request without waiting
     * @param {string} alias - The alias of the intercepted request
     * @param {number} statusCode - The expected status code of the response
     * @returns {void}
     */
    verifyResponseStatusCode(alias, statusCode) {
        cy.get(`@${alias}`).its('response.statusCode').should('eq', statusCode)
        this.assertionLog(`Verified status code "${statusCode}" for intercepted request "${alias}"`)
    }

    /**
     * Verifies the status message of the intercepted request without waiting
     * @param {string} alias - The alias of the intercepted request
     * @param {number} statusMsg - The expected status message of the response
     * @returns {void}
     */
    verifyResponseStatusMessage(alias, statusMsg) {
        cy.get(`@${alias}`).its('response.statusMessage').should('eq', statusMsg)
        this.assertionLog(`Verified status message "${statusMsg}" for intercepted request "${alias}"`)
    }

    /**
     * Verifies the status code and the status message of the intercepted request without waiting
     * @param {string} alias - The alias of the intercepted request
     * @param {number} statusCode - The expected status message of the response
     * @param {number} statusMsg - The expected status message of the response
     * @returns {void}
     */
    verifyResponseStatusCodeAndMessage(alias, statusCode, statusMsg) {
        cy.get(`@${alias}`)
          .its('response.statusCode').should('eq', statusCode)
          .and('response.statusMessage').should('eq', statusMsg)
        this.assertionLog(`Verified status code "${statusCode}" and status message "${statusMsg}" for intercepted request "${alias}"`)
    }

    /**
     * Verifies that the current URL contains the specified partial path
     * @param {string} partialPath - The partial path to verify in the URL
     * @returns {void}
     */
    verifyPartialUrl(partialPath) {
        cy.url().should('include', partialPath)
        this.assertionLog(`Verified URL with partial path "${partialPath}"`)
    }

    /**
     * Verifies that the current URL matches the specified full path
     * @param {string} fullPath - The full path to verify in the URL
     * @returns {void}
     */
    verifyFullUrl(fullPath) {
        cy.url().should('eq', fullPath)
        this.assertionLog(`Verified URL "${fullPath}"`)
    }

    /**
     * Verifies that the current URL matches the full path with the base URL
     * @param {string} partialPath - The partialPath relative to the base URL to verify
     * @returns {void}
     */
    verifyFullUrlWithBaseUrl(partialPath) {
        const fullUrl = `${Cypress.env('baseUrl')}${partialPath}`
        this.verifyFullUrl(fullUrl)
    }

    /**
     * Verifies the title of the page
     * @param {string} titleText - The title of the page
     * @returns {void}
     */
    verifyPageTitle(titleText) {
        cy.title().should('eq', titleText)
        this.assertionLog(`Verified URL "${titleText}"`)
    }

    /**
     * Verifies the visibility of an element
     * @param {string} selector - The selector of the element to check visibility for
     * @param {string} [elem] - An optional name of the element to include in the log message
     * @returns {void}
     */
    elementIsVisible(selector, elem='') {
        cy.get(selector).should('be.visible')
        if(elem==''){
            this.assertionLog(`Element is visible`)
        } else {
            this.assertionLog(`"${elem}" is visible`)
        }
    }

    /**
     * Verifies the visibility of the first of many elements
     * @param {string} selector - The selector of the element to check visibility for
     * @param {string} [elem] - An optional name of the element to include in the log message
     * @returns {void}
     */
    firstElementIsVisible(selector, elem='') {
        cy.get(selector).first().should('be.visible')
        if(elem==''){
            this.assertionLog(`Element is visible`)
        } else {
            this.assertionLog(`First element of "${elem}" is visible`)
        }
    }

    /**
     * Verifies the visibility of the last of many elements
     * @param {string} selector - The selector of the element to check visibility for
     * @param {string} [elem] - An optional name of the element to include in the log message
     * @returns {void}
     */
    lastElementIsVisible(selector, elem='') {
        cy.get(selector).last().should('be.visible')
        if(elem==''){
            this.assertionLog(`Element is visible`)
        } else {
            this.assertionLog(`Last element of "${elem}" is visible`)
        }
    }

    /**
     * Verifies the visibility of each element
     * @param {string} selector - The selector of elements to check visibility for
     * @returns {void}
     */
    eachElementIsVisible(selector) {
        cy.get(selector).each( el => 
            cy.wrap(el).should('be.visible').then( el => 
                this.assertionLog(`Element containing "${el.text()}" is visible`)
            )
        )
    }

    /**
     * Verifies the visibility of an element using its data-test-id attribute
     * @param {string} testId - The data-test-id of the element to check visibility for
     * @param {string} [elem] - An optional name of the element to include in the log message
     * @returns {void}
     */
    checkVisibilityByTestId(testId, elem = '') {
        cy.get(`[data-test-id="${testId}"]`).should('be.visible')
        if (elem === '') {
            this.assertionLog(`Element with data-test-id "${testId}" is visible`)
        } else {
            this.assertionLog(`"${elem}" is visible`)
        }
    }

    /**
     * Verifies the visibility of an element
     * @param {string} text - The text of the element to check visibility for
     * @returns {void}
     */
    elementIsVisibleByText(text) {
        cy.contains(text).should('be.visible')
        this.assertionLog(`Element containing text "${text}" is visible`)
    }

    /**
     * Verifies that an element is not visible
     * @param {string} selector - The selector of the element to check non-visibility for
     * @returns {void}
     */
    elementIsNotVisible(selector, elem='') {
        cy.get(selector).should('not.be.visible')
        if(elem==''){
            this.assertionLog(`Element is not visible`)
        } else {
            this.assertionLog(`"${elem}" is not visible`)
        }
    }

    /**
     * Verifies the visibility of an element
     * @param {string} text - The text of the element to check visibility for
     * @returns {void}
     */
    elementIsNotVisibleByText(text) {
        cy.contains(text).should('not.be.visible')
        this.assertionLog(`Element containing text "${text}" is not visible`)
    }

    /**
     * Verifies that an element exists in the DOM
     * @param {string} selector - The selector of the element to check existence for
     * @param {string} [elem] - An optional name of the element to include in the log message
     * @returns {void}
     */
    elementExists(selector, elem='') {
        cy.get(selector).should('exist')
        cy.get(selector).should('not.be.visible')
        if(elem==''){
            this.assertionLog(`Element exists in DOM`)
        } else {
            this.assertionLog(`"${elem}" exists in DOM`)
        }
    }

    /**
     * Verifies that an element does not exist in the DOM
     * @param {string} selector - The selector of the element to check non-existence for
     * @param {string} [elem] - An optional name of the element to include in the log message
     * @returns {void}
     */
    elementDoesNotExist(selector, elem='') {
        cy.get(selector).should('not.exist')
        cy.get(selector).should('not.be.visible')
        if(elem==''){
            this.assertionLog(`Element does not exist in DOM`)
        } else {
            this.assertionLog(`"${elem}" does not exist in DOM`)
        }
    }

    /**
     * Verifies that an element contains the specified (partial) text
     * @param {string} selector - The selector of the element to check for text
     * @param {string} text - The text to verify within the element
     * @returns {void}
     */
    elementContainsText(selector, text) {
        cy.get(selector).should('contain', text)
        this.assertionLog(`Element containing the text "${text}" verified`)
    }

    /**
     * Retrieves the text of an element
     * @param {string} selector - The CSS selector of the element
     * @returns {Cypress.Chainable<string>} - The text content of the element
     */
    getElementText(selector) {
        this.actionLog(`Retrieving text from element`)
        return cy.get(selector).then(el => el.text().trim())
    }

    /**
     * Get an element by data-test-id
     * @param {string} testId - The value of the data-test-id attribute
     * @returns {Cypress.Chainable<HTMLElement>} The element with the specified data-test-id
     */
    getElementByTestId(testId) {
        return cy.get(`[data-test-id="${testId}"]`)
    }

    /**
     * Get an elements by its selector
     * @param {string} selector - The CSS selector of the element
     * @returns {Cypress.Chainable<HTMLElement>} The element with the specified data-test-id
     */
    getElement(selector) {
        return cy.get(selector)
    }

    /**
     * Get first of many elements by data-test-id
     * @param {string} selector - The CSS selector of the element
     * @returns {Cypress.Chainable<HTMLElement>} The element with the specified data-test-id
     */
    getFirstElement(selector) {
        return cy.get(selector).first()
    }

    /**
     * Get last of many elements by data-test-id
     * @param {string} selector - The CSS selector of the element
     * @returns {Cypress.Chainable<HTMLElement>} The element with the specified data-test-id
     */
    getLastElement(selector) {
        return cy.get(selector).last()
    }

    /**
     * Verifies that an element's text matches the specified text exactly
     * @param {string} selector - The CSS selector of the element
     * @param {string} expectedText - The exact text to verify within the element
     * @returns {void}
     */
    verifyElementText(selector, expectedText) {
        this.getElementText(selector).then(actualText => {
            expect(actualText).to.equal(expectedText)
        })
        this.assertionLog(`Element contains the expected text "${expectedText}"`)
    }

    /**
     * Verify the text content of an element by data-test-id
     * @param {string} testId - The value of the data-test-id attribute
     * @param {string} expectedText - The expected text content of the element
     * @returns {void}
     */
    verifyTextByTestId(testId, expectedText) {
        this.getElementText(`[data-test-id="${testId}"]`).then(actualText => {
            expect(actualText).to.equal(expectedText)
        })
        this.assertionLog(`Element with data-test-id "${testId}" contains "${expectedText}"`)
    }

    /**
     * Logs a custom message in the Cypress test report.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    logMessage(message) {
        cy.log(message)
    }
    
    /**
     * Logs an action and performs it.
     * @param {string} actionDescription - A description of the action being performed
     * @param {Function} action - The action function to be executed
     * @returns {void}
     */
    actionLog(actionDescription) {
        this.logMessage(`Action: ${actionDescription}`)
    }

    /**
     * Logs an assertion and performs it.
     * @param {string} assertionDescription - A description of the assertion being checked
     * @param {Function} assertion - The assertion function to be executed
     * @returns {void}
     */
    assertionLog(assertionDescription) {
        this.logMessage(`Assertion: ${assertionDescription}`)
    }

    /**
     * Selects an item from a dropdown menu by text
     * @param {string} selector - The CSS selector for the dropdown menu
     * @param {string} optionText - The text of the option to select
     * @returns {void}
     */
    selectDropdownByText(selector, optionText) {
        this.actionLog(`Selecting "${optionText}" from dropdown`)
        cy.get(selector).select(optionText).should('have.value', optionText)
        this.assertionLog(`"${optionValue}" selected from the dropdown`)
    }

    /**
     * Selects an item from a dropdown menu by its value attribute
     * @param {string} selector - The CSS selector for the dropdown menu
     * @param {string} optionValue - The value of the option to select
     * @returns {void}
     */
    selectDropdownByValue(selector, optionValue) {
        this.actionLog(`Selecting option with value "${optionValue}"`)
        cy.get(selector).select(optionValue).should('have.value', optionValue)
        this.assertionLog(`"${optionValue}" selected from the dropdown`)
    }
    
    /**
     * Selects an item from a dropdown menu using data-test-id attribute
     * @param {string} testId - The data-test-id for the dropdown menu
     * @param {string} optionValue - The value of the option to select
     * @returns {void}
     */
    selectDropdownByTestId(testId, optionValue) {
        this.actionLog(`Selecting option with value "${optionValue}" from dropdown with data-test-id "${testId}"`)
        cy.get(`[data-test-id="${testId}"]`).select(optionValue).should('have.value', optionValue)
        this.assertionLog(`"${optionValue}" selected from the dropdown`)
    }

    /**
     * Waits for a specified number of seconds.
     * @param {number} seconds - The number of seconds to wait.
     * @returns {void}
     */
    waitForSeconds(seconds) {
        cy.wait(seconds * 1000)
    }
    
    /**
     * Verifies the value of an attribute for a given element
     *
     * @param {string} selector - The CSS selector of the element
     * @param {string} attribute - The name of the attribute to verify
     * @param {string} expectedValue - The expected value of the attribute
     */
    verifyAttributeValue(selector, attribute, expectedValue) {
        cy.get(selector).should('have.attr', attribute, expectedValue)
    }
}