const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/userLogin", {
useUnifiedTopology: true,
useNewUrlParser: true,
}).then(() => console.log('DB Connected!')).catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});

const db = mongoose.connection;

module.exports = db;