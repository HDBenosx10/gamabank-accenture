// cardEntrieCreditInstallment é um obj 
class CreditCardTransaction {
    constructor({clientCard, clientCod, cardEntrieValue, installmentNumber, cardEntrieCreditInstallment, description}){
        this.clientCard = clientCard,
        this.clientCod= clientCod, 
        this.cardEntrieValue = cardEntrieValue, 
        this.installmentNumber = installmentNumber,
        this.installments = cardEntrieCreditInstallment,
        this.creditPostingDate = new Date()*1,
        this.description = description

    }
}

module.exports = CreditCardTransaction
