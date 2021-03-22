const { generateStatement } = require('../../services/statement.service')
const { getUserTokenData } = require('../../services/userTokenData.service')


const statementHandler = async (request, h) => {
    const token = request.headers['x-access-token']
    if(token) {
        try {
            const initDate = request.params.initDate //Entrada e saída em unix timestamp.
            const endDate = request.params.endDate
            const { checkingAccountNumber } = await getUserTokenData(token)
            const result = {acc:checkingAccountNumber, initDate, endDate}
            return await generateStatement(result)

        }catch (err) {
            return err.message
        }

    }

}

module.exports = statementHandler