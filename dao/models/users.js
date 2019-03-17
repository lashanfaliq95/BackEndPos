const db = require('../db');
const Schema = db.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});
//hash password before saving to the database
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});
const user = db.model('user', UserSchema);
module.exports = user;

