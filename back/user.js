// This is the mongoose user model

var mongoose		=		require('mongoose');
var Schema			=		mongoose.Schema;

var user			= 		new Schema({
	doctor: String,
	password: String
});

//expose it via module exports
module.exports = mongoose.model('User',user);