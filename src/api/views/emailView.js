const signupHtml = (userInfo) => {
    return (`
    <table>
        <tr>
            <td rowspan="6"><img src="https://images-ext-1.discordapp.net/external/C8zbQOejaBVjxWOslOYy4lnjS6hKxMlWrWQPkZyhiv4/https/cdn.pixabay.com/photo/2016/11/05/07/37/credit-card-1799583_960_720.png?width=689&height=457" style="width: 250px;"></td>
            <td colspan="2"><h1 style="color:#013a63; align-text: center; font-family: 'Helvetica', sans-serif; font-size: 20px">Bem vindo ao HelloBank!</h1></td>
        </tr>
        <tr>
            <td><h2 style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;"> ${userInfo.clientName.split(' ')[0]}, é um prazer ter você conosco!</h2></td>
        </tr>
        <tr>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;">O número de sua conta: ${userInfo.checkingAccountNumber} </p></td>
        </tr>
        <tr>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;">Número do cartão e cvv: ${userInfo.number} / ${userInfo.cvv} </p></td>
        </tr>
        <tr>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;">Senha provisória: ${userInfo.password}</p></td>
        </tr>
        <tr>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;">Data de expiração: ${userInfo.expiration}</p></td>
        </tr>
    </table> 
    `)

}
 

const paidInstallmentHtml = (userInfo) => {
    return(`
    <table>
    <tr>
        <td rowspan="2"><img src="https://imagepng.org/wp-content/uploads/2019/12/check-icone-1-scaled.png" style="width: 150px;"></td>
        <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td colspan="2"><h1 style="color:#013a63; align-text: center; font-family: 'Helvetica', sans-serif; font-size: 20px">Boa, ${userInfo.clientName.split(' ')[0]}!</h1></td>
    </tr>
    <tr>
        <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;"> A fatura do seu cartão de número ${userInfo.clientCardNumber} acabou de ser paga!</p></td>
    </tr>
    `)
}

const creditCardEntryHtml = (userInfo) => {
    return (`
    <table>
        <tr>
            
            <td rowspan="4"><img src="https://thalassafestival.com/wp-content/uploads/2019/12/registration-icon-png-6.png" style="width: 150px;"></td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td colspan="2"><h1 style="color:#013a63; align-text: center; font-family: 'Helvetica', sans-serif; font-size: 20px">Caro(a) ${userInfo.clientData.clientName.split(' ')[0]},</h1></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;"> Uma nova compra de R$ ${userInfo.value.toFixed(2)} no cartão de número ${userInfo.cardNumber} acabou de ser cadastrada!</p></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;"> Descrição: ${userInfo.description}</p></td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;"> Parcelamento em ${userInfo.installments} vezes.</p></td>
        </tr>
    `)
}

const paidDebitHtml = (userInfo) => {
    return (`
    <table>
        <tr>
            <td rowspan="5"><img src="https://images-ext-1.discordapp.net/external/d_5YjsmAFRhtXK5fbyG_0LIwn1-gGv09hFWMtZRv4f8/https/upload.wikimedia.org/wikipedia/commons/thumb/6/65/Credit_or_Debit_Card_Flat_Icon_Vector.svg/1200px-Credit_or_Debit_Card_Flat_Icon_Vector.svg.png?width=702&height=702" style="width: 250px;"></td>
            <td colspan="2"><h1 style="color:#013a63; align-text: center; font-family: 'Helvetica', sans-serif; font-size: 20px">Novo lançamento de débito!</h1></td>
        </tr>
        <tr>
            <td><h2 style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;"> Uma nova compra de débito foi cadastrada!</h2></td>
        </tr>
        <tr>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;">Valor: R$ ${userInfo.value.toFixed(2)} </p></td>
        </tr>
        <tr>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;">Descrição: ${userInfo.description}</p></td>
        </tr>
        <tr>
            <td><p style= "align-text: center; font-family: 'Helvetica', sans-serif; font-size: 14px;">Horário: ${userInfo.dataFormatada}</p></td>
        </tr>
    </table>
    `)
}

module.exports = {signupHtml, paidInstallmentHtml, creditCardEntryHtml, paidDebitHtml}