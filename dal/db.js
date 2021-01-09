const mongoose = require('mongoose');
const uri = 'mongodb+srv://sbookshop:ptudw123@cluster0.em6hz.mongodb.net/sbookshop';

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect successful!');
    } catch (error) {
        console.log('Connect fail!');
    }
}

module.exports = { connect };