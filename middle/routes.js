// middleware - routes.js

var user		=		require('../back/user.js');
var	medications	=		require('../back/medications.js');
var	client		=		require('./twilioapi.js');
var mongoose	=		require('mongoose');
var twilio 		= 		require('twilio');
var hospitals	=		require('../back/hospitals.js');


// ===================== //
module.exports = function(app){

	app.post("/api/sms", function(req,res){
		// console.log(req.body.lang);
		console.log("Food!");
		console.log(req.body);
		// english case - this one will call
		if(req.body.lang=="English")
		{
				// client.sendSMS({
				// to:  req.body.patient, //'+2347036310418',
				// // from: '+15005550006',
				// from: '+13343842829',
				// body: req.body.drugs[0].dosage + " of " + req.body.drugs[0].name + " " + req.body.drugs[0].times + " times, every " + req.body.drugs[0].frequency
				client.makeCall({
				to:  req.body.patient, //'+2347036310418',
				// from: '+15005550006',
				from: '+13343842829',
				url: 'http://demo.twilio.com/docs/voice.xml'
			}, function(error, message) {
				if (error) {
					console.log(error.message);
				}
				console.log("Successfully sent to Twilio");
			});
		}
		// yoruba case
		else if(req.body.lang=="Yoruba")
		{
				client.sendSMS({
				to:  req.body.patient, //'+2347036310418',
				// from: '+15005550006',
				from: '+13343842829',
				body: "Ko mu " + req.body.drugs[0].name + " eyo " + req.body.drugs[0].dosage + ", nigba " + req.body.drugs[0].times + " l'ojojumo"

			}, function(error, message) {
				if (error) {
					console.log(error.message);
				}
				console.log("Successfully sent");
			});
		}
		// pidgin case
		else if(req.body.lang=="Pidgin")
		{
				client.sendSMS({
				to:  req.body.patient, //'+2347036310418',
				// from: '+15005550006',
				from: '+13343842829',
				body: "Make you take " + req.body.drugs[0].dosage + " of your " + req.body.drugs[0].name + " for " + req.body.drugs[0].times + " times every momo"
				
			}, function(error, message) {
				if (error) {
					console.log(error.message);
				}
				console.log("Successfully sent");
			});
		}
		

	});

	// Create a route to respond to a call
	app.post('/api/respondToSMS', function(req, res) {
		console.log("Person sent:"+req.body.Body);
		console.log("From number:"+req.body.From);
		//Validate that this request really came from Twilio...
		// if (twilio.validateExpressRequest(req, client.authToken)) {
			var twiml = new twilio.TwimlResponse();
			// twiml.say('Hi! Thanks for checking out my app!')
			// .play('http://myserver.com/mysong.mp3');
			// res.type('text/xml');
			// res.send(twiml.toString());
			twiml.message('Thanks for subscribing!');
			res.writeHead(200, {
				'Content-Type':'text/xml'
			});
			res.end(twiml.toString());
		// }
		// else {
			// res.send('you are not twilio.  Buzz off.');
		// }
	});

	app.get("/api/hospitals", function(req,res){
		// console.log(req.query);
		hospitals.find(function(err, entries) {
                if (err)
                    res.send(err)
                res.json(entries);
            });
	// console(req.body.doctor);
	// medications.findOne({ doctor: req.body.doctor }, function(err, entries) {
 //                if (err)
 //                    res.send(err)
 //                res.json(entries);
 //            });
	});

	app.get("/api/medications", function(req,res){
		// console.log(req.query);
		medications.find(req.query, function(err, entries) {
                if (err)
                    res.send(err)
                res.json(entries);
                console.log(req.query);
            });
	// console(req.body.doctor);
	// medications.findOne({ doctor: req.body.doctor }, function(err, entries) {
 //                if (err)
 //                    res.send(err)
 //                res.json(entries);
 //            });
	});

	app.post("/api/medications", function(req,res){
		console.log(req.body);
		medications.create({
			doctor: req.body.doctor,
			patient: req.body.patient,
			lang: req.body.language,
			drugs: req.body.drugs
		},function(err,entry){
			if(err)
				res.send(err);
			medications.find({ doctor: req.body.doctor }, function(err, entries) {
                if (err)
                    res.send(err)
                res.json(entries);
            });
		// medications.findOne({ doctor: req.body.doctor }, function(err, entries) {
  //               if (err)
  //                   res.send(err)
  //               res.json(entries);
  //           });
		}
		)
	});

}
