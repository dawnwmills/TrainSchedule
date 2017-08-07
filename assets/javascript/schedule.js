
  // Initialize Firebase=================================
  var config = {
    apiKey: "AIzaSyBKelWHtyEYlUBPISbzRslrQrc8qwjM68I",
    authDomain: "train-schedule-46987.firebaseapp.com",
    databaseURL: "https://train-schedule-46987.firebaseio.com",
    projectId: "train-schedule-46987",
    storageBucket: "",
    messagingSenderId: "108119712124"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// Button Click============================================

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

//do i need this function here?
//$(document).ready(function(){
//	event.preventDefault();

//Variables to add new train information===================

	var newTrain = $('#input-train').val().trim();
	var newPlace = $('#input-place').val().trim();
	var newTime = moment($('#input-time').val().trim(), "HH:mm"). format("X");
	var newFrequency = $('#input-frequency').val().trim();

	//var newFrequency = moment().startOf('hour').fromNow($("#input-frequency").val().trim(), 'hour').format("X"); 

	var updateTrain = {
		name: newTrain,
	 	place: newPlace,
	 	time: newTime,
	 	frequency: newFrequency,
	 	timeAdded: firebase.database.ServerValue.TIMESTAMP
	 };

database.ref().push(updateTrain);

// Log to console

	console.log(updateTrain.name);
	console.log(updateTrain.place);
	console.log(updateTrain.time);
	console.log(updateTrain.frequency);

//alert

alert("Train Schedule Update Complete");


//clear form
	$("#input-train").val("");
	$("#input-place").val("");
	$("#input-time").val("");
	$("#input-frequency").val("");
});


database.ref().on("child_added", function(childSnapshot) {

	
	var newTrain = childSnapshot.val().name;
	var newPlace = childSnapshot.val().place;
	var newTime = childSnapshot.val().time;
	var newFrequency = childSnapshot.val().frequency;


	console.log(childSnapshot.val().newTrain);
    console.log(childSnapshot.val().newPlace);
    console.log(childSnapshot.val().newTime);
    console.log(childSnapshot.val().newfrequency);

	

	//Train calculations======================================

	var tFrequency = parseInt(newFrequency);

	var firstTime = "05:00";

	// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, 'HH:mm').subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment().format('HH:mm'));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesAway);

    // Next Train
    var nextTrain = moment().add(tMinutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm'));


	// add each train's data into the table

	$("#train-table > tbody").append("<tr><td>" + newTrain + "</td><td>" + newPlace + "</td><td>" +
  newFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesAway + "</td></tr>");

	// function(errorObject) {
	//	console.log("Read failed: " + errorObject.code)
	//}

});





