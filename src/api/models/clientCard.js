class ClientCard {
    constructor(number, holder, expiration, cvv, password, encryptedPassword, salt, limit){
        this.number = number,
        this.holder = holder ,
        this.expiration = expiration,
        this.cvv = Number(cvv),
        this.password = password,
        this.encryptedPassword = encryptedPassword,
        this.salt = salt
        this.limit = limit
    }
}

module.exports = ClientCard