const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        first_name: {
            type:String,
            required:[true,'First name is required']
        },
        last_name: {
            type: String,
            required:[true, 'Last name is required']
        },
        email: {
            type: String,
            required: [true, 'Email Address is required']
        },
        phone: { 
            type: String,
            required: [true, 'Phone number is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        }
});

const User = mongoose.model('User',userSchema);

module.exports = User;