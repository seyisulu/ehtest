// medications Schema


var	mongoose			= 	require('mongoose');
var	Schema				= 	mongoose.Schema;


var	medications			=	new Schema({
	doctor: String,
	patient: String,
	drugs: [{
		name: String,
		dosage: Number,
		times: Number,
		frequency: String
	}]
});

module.exports	=	mongoose.model('Medications',medications);