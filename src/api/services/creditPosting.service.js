const {getUserCardData} = require('../repository/clientCard.repository')
const generateInstallment = require('./installment.service')
const creditPostingRepository = require('../repository/creditPosting.repository')
// falta o clientCod
const creditTransaction = async (creditCardTransaction) => {
    try{
        const {cardEntrieValue,installmentNumber,clientCard,creditPostingDate} = creditCardTransaction
        const cardData = await getUserCardData(clientCard)
        if (cardEntrieValue <= 0 ||
            typeof cardEntrieValue !== "number") {
            throw new Error("Valor inválido!")
        }
    
        if (cardData.clientCreditCardLimit < cardEntrieValue) {
            throw new Error("Eita! Limite insuficiente")
        }
    
        creditCardTransaction.clientCod = cardData.clientCod
    
        creditCardTransaction.installments = generateInstallment(installmentNumber,cardEntrieValue,creditPostingDate)
        const msg = await creditPostingRepository.newCreditPosting(creditCardTransaction)
        
        return msg
    }catch(err) {
        throw err
    }
}



module.exports = creditTransaction

