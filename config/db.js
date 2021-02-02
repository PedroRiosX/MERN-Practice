const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`we're connected bitchies`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDatabase;