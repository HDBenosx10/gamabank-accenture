const database = require('../../helpers/database.util.js')

const getCreditStatement = async (date, creditCardumber) => {
    let sqlstatement = `SELECT inst.creditCardEntrieInstallmentDate,  inst.creditCardEntrieInstallmentValue,  cardentrie.cardEntrieCreditDescription FROM cardentrie
    INNER JOIN clientCard ON clientCard.clientCardNumber = cardentrie.clientCardNumber
    INNER JOIN creditcardentrieinstallment AS inst ON  inst.creditCardEntrieCod = cardentrie.cardEntrieCod
    WHERE clientCard.clientCardNumber = "${creditCardumber}" AND inst.creditCardEntrieInstallmentDate LIKE "${date}%"`
    try{
        const result = await database.query(sqlstatement)
        if(result.length === 0) throw new Error("Não existe fatura em aberto para o mês selecionado.")

        return result
    } catch(err) {
        throw err
    }
    
}

module.exports = getCreditStatement