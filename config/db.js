const mongoose = require('mongoose');
const config = require('config');

//grab MongoURI from keys file
const db = config.get('mongoURI');

//connect settings
connectSettings = {
    'useNewUrlParser': true,        //useNewUrlParser and useUnifiedTopology
    'useUnifiedTopology': true,     //are set avoid deprecated settings.
    'useFindAndModify': false
}

const connectDB = async () => {
    try {
        await mongoose.connect(db, connectSettings);
        console.log('YAY! MongoDB connected! (ง ͠° ͟ل͜ ͡°)ง')
    } catch(err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB