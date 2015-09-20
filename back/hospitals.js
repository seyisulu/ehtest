// hospitals schema

var mongoose		= 	require('mongoose');
var Schema 			= 	mongoose.Schema;

var hospitals		= new Schema(
{
	name: 		String,
	license: 	String,
	address: 	String,
	lga: 		String,
	doctorlist: 		[{
		id: 			String,
		specialization: String,
		number: 		String
	}]
});

module.exports	=	mongoose.model('Hospitals',hospitals);