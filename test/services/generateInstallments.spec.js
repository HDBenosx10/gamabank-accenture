var chai = require('chai')
const {assert, expect} = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const generateInstallment = require('../../src/api/services/installment.service')


describe('Teste de geração de lançamento de credito',()=>{
    
    it('Passando uma data, devem ser geradas parcelas mensais a partir do mes seguinte a essa data',async ()=>{
        const installment = await generateInstallment(4, 1000, 1614959426000)
        const dates = installment.map(obj => obj.date)
        expect(dates).to.have.members(['2021-04-05','2021-05-05','2021-06-05','2021-07-05']);
        

    })

})