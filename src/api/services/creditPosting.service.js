const {getUserCardData} = require('../repository/clientCard.repository')
const generateInstallment = require('./installment.service')
const newCreditPosting = require('../repository/creditPosting.repository')
const validateCardData = require('./validateClientCard.service')
// falta o clientCod
const creditTransaction = async (creditCardTransaction, creditCard) => {
    try{
        const {cardEntrieValue,installmentNumber,clientCard,creditPostingDate} = creditCardTransaction
        const cardData = await getUserCardData(clientCard)
        await validateCardData(creditCard, cardData)
        if (cardEntrieValue <= 0 ||
            typeof cardEntrieValue !== "number") {
            throw new Error("Valor inválido!")
        }
    
        if (cardData.clientCreditCardLimitAvailable < cardEntrieValue) {
            throw new Error("Eita! Limite insuficiente")
        }
        

        creditCardTransaction.clientCod = cardData.clientCod
        
        const newLimit = cardData.clientCreditCardLimitAvailable - cardEntrieValue
        creditCardTransaction.installments = generateInstallment(installmentNumber,cardEntrieValue,creditPostingDate)
        const msg = await newCreditPosting(creditCardTransaction,newLimit)
        
        return {clientCod: creditCardTransaction.clientCod, msg}
    }catch(err) {
        throw err
    }
}



module.exports = creditTransaction

