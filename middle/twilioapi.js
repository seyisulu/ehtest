// twilio api

var accountSid	=	"";
var authToken	=	"";
var twilio 		= 	require('twilio');

module.exports = new twilio.RestClient(accountSid, authToken);
 
// client.messages.create({
//     to:'+234...',
//     from:'+1...',
//     // from:'eHospital',
//     body:'Awon aiiiyee!!! Won lenu razzooorr!! Twilio is working! Oooose!!'
// }, function(error, message) {
//     if (error) {
//         console.log(error.message);
//     }
// });
