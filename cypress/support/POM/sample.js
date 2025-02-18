import Utils from '../utils'

/**
 * @author Zahin Ahad
*/

export default class Sample extends Utils{

    /**
     * Clicks on an element
     * @returns {void}
     */
    click() {
        this.clickElementByTestId('sample')
    }

    /**
     * Verifies partial URL
     * @returns {void}
     */
    verifyUrl() {
        this.verifyPartialUrl('/sample/sample')
    }
}    
