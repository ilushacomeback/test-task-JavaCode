module.exports = class UserDTO {
    email;
    id;
    username;

    constructor(model) {
        this.email = model.email
        this.id = model.id
        this.username = model.username
    }
}