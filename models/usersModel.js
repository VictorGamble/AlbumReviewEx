const db = require('./conn'),
    bcrypt = require('bcryptjs');


class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async addUser() {
        console.log('addingUser', this)
        try {
            const response = await db.one(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING ID;`, [this.firstName, this.lastName, this.email, this.password])
            console.log("add user response", response);
            return response;
        } catch (error) {
            console.error("ERROR: ", error);
            return error;
        }
    }
    async loginUser() {
        console.log('logging in user')
        try {
            const response = await db.one(`SELECT id, first_name, last_name, password FROM users WHERE email = $1;`, [this.email]);
            console.log('response: ', response);
            const isValid = this.checkPassword(response.password);
            if (!!isValid) {
                console.log('Success');
            } else {
                console.log('GO AWAY');
            }
        } catch (error) {
            console.error("ERROR: ", error);
            return error;
        }
    }
}











module.exports = User;