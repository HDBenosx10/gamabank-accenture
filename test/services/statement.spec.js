const { generateStatement } = require('../../src/api/services/statement.service')
var chai = require('chai')
const {assert, expect} = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised);

describe('Teste do gerador de extrato',() => {
    
    it('Passando datainicio, datafim e conta, deve retornar extrato ordenado por data.',
        async () => {

        const params = {
            acc: 7, 
            initDate: 1614628133, 
            endDate: 1617306533
        }

        // await assert.typeOf(generateStatement(params), 'object')
        const result = await generateStatement(params)
        assert.typeOf(result, 'array')
    })

})