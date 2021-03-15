const checkingAccount = require('../repository/checkingAccount.repository')
const depositRepository = require('../repository/deposit.repository')



const newDeposit = async (deposit)=>{
    const clientAccount =  await checkingAccount.getCurrentAccount(deposit.accNumber)
    if(deposit.value <= 0) return "Valor incorreto: insira um valor positivo"
    if(!clientAccount) return "Conta não encontrada"
    const newAccountBalance = clientAccount.checkingAccountBalance + deposit.value
    try {
        await depositRepository.newDepositQuery(deposit)
        await checkingAccount.updateBalance(deposit.accNumber, newAccountBalance)
        return "Depósito efetuado com sucesso!"
    } catch (err) {
        console.log(err)
    }
}


module.exports = { newDeposit }