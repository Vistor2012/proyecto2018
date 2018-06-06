const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Inmuebles",function	(error,db) {
	if (error) {
		console.log('Unable to connect to the server. Please start the server. Error:', error);
    } else {
        console.log('Connected to mongo Server successfully!');
	}
});
module.exports = mongoose;
