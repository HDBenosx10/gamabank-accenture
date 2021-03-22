const {getEntries, getCheckouts} = require('../repository/statement.repository');
const StatementRegister = require('../models/statement')

//Entrada vinda do getEntries: checkingAccountEntryDate, checkingAccountEntryType, checkingAccountEntryValue, checkingAccountEntryDescription

//Entrada vinda do getCheckouts: checkingAccountCheckoutDate, checkingAccountCheckoutType, checkingAccountCheckoutValue, checkingAccountCheckoutDescription

//Entradas do modelo: Mes, Date, Valor, tipoOperacao, descricao
//tipoOperacao: Transferência, depósito, etc
//statementRequestObj: {acc, initDate, endDate}
//Criar um helper para validar as datas!

const generateStatement = async ({acc, initDate, endDate}) => {
    try{
        //Iteração das entradas
        const entryList = await getEntries({acc,initDate,endDate})
        if (!entryList.length) throw new Error("Não existem transações nesse intervalo de tempo")
        const statementEntries = entryList.map(entryRegister => {
            const {
                checkingAccountEntryDate, 
                checkingAccountEntryType, 
                checkingAccountEntryValue, 
                checkingAccountEntryDescription } = entryRegister
            return (
                new StatementRegister(
                    checkingAccountEntryType, 
                    checkingAccountEntryDate.toUTCString(),
                    checkingAccountEntryValue,
                    "entry",
                    checkingAccountEntryDescription
                )
            )
        })
        //Iteração das saídas
        const checkoutList = await getCheckouts({acc,initDate,endDate})
        //console.log('checkoutList', checkoutList)
        const statementCheckouts = checkoutList.map(checkoutRegister => {
            //console.log(checkoutRegister)
            const {
                checkingAccountCheckoutDate, 
                checkingAccountCheckoutType, 
                checkingAccountCheckoutValue, 
                checkingAccountCheckoutDescription } = checkoutRegister
            return (
                new StatementRegister(
                    checkingAccountCheckoutType, 
                    checkingAccountCheckoutDate.toUTCString(), //.toLocaleString(),
                    checkingAccountCheckoutValue,
                    "checkout",
                    checkingAccountCheckoutDescription
                )
            )
        })
        //console.log([ ...statementEntries,...statementCheckouts ])

        const result =  [ ...statementEntries,...statementCheckouts ].sort((entrada1, entrada2) => {
            const date1 = Date.parse(entrada1.date)
            const date2 = Date.parse(entrada2.date)
            return(date2 - date1)
        })
        

        return result

    }catch(err){
        throw err
    }

}

module.exports = {generateStatement}