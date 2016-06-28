  var config = {
    apiKey: "AIzaSyBdrJ_jChu_1I95sFPdGbWaTjhWxySg-TE",
    authDomain: "forms-8af72.firebaseapp.com",
    databaseURL: "https://forms-8af72.firebaseio.com",
    storageBucket: "forms-8af72.appspot.com",
  };
    

firebase.initializeApp(config);

var database = firebase.database();


$("#addTrainBtn").on("click", function(){

	var trainName = $("#trainNameInput").val().trim();
	var trainDest = $("#destinationInput").val().trim();
	var trainFirst = moment($("#firstInput").val().trim(), "HH:mm").format("X");
	var trainFreq = $("#freqInput").val().trim();

	var newTrain = {
		name:  trainName,
		destination: trainDest,
		first: trainFirst,
		frequency: trainFreq
	}

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.first);
	console.log(newTrain.frequency)

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstInput").val("");
	$("#freqInput").val("");

	return false;
});


database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().first;
	var trainFreq = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDest);
	console.log(trainFirst);
	console.log(trainFreq);

	var trains = moment().format('hh:mm a');
	var trainMin = moment().diff(moment.unix(trainFirst, 'X'), "minutes");
	console.log(trainMin);


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + trains + "</td><td>" + trainMin + "</td><td>");

});