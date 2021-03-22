const { newDebitExpenses } = require('../../services/debitExpense.service')
const { getUserTokenData } = require('../../services/userTokenData.service')
const CheckingTransaction = require('../../models/checkingTransaction')
const {verify} = require('../../services/auth.service')
const {sendPaidDebitEmail} = require('../../services/email.service')


const paydebitHandler = async (request, h) => {
    const token = request.headers['x-access-token']
    const {data} = await verify(token)
    let emailTarget = data.username
    let shouldEmailBeSent = true
    if (token) {
        let emailData
        try {
            const { value, description } = request.payload
            const { checkingAccountNumber } = await getUserTokenData(token) // dados out cpf e ContaDestino
            const transferData = new CheckingTransaction({ description, account: checkingAccountNumber, value, bank: 999 })
            emailData = {
                email: emailTarget,
                value,
                description
            }
            
            
            return await newDebitExpenses(transferData) 

        } catch (err) {
            shouldEmailBeSent = false
            return err.message
        }finally{
            if (shouldEmailBeSent) await sendPaidDebitEmail(emailData)
        }
    }
}

module.exports = paydebitHandler