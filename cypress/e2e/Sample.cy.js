import Sample from '../support/POM/sample'
const samp = new Sample()

/**
 * @author Zahin Ahad
*/

describe('Sample', () => {
    
    before(() => {
        samp.clearAllStorage()
    })
    
    beforeEach(() => {})

    context('Test Block 1', () => {

        it('Test Case 1', () => {})
    
        it('Test Case 2', () => {})
    })

    context('Test Block 2', () => {

        it('Test Case 3', () => {})

        it('Test Case 4', () => {})
    })
    
    after(() => {})
    
    afterEach(() => {})
})