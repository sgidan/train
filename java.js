
var trainName = "";
var destination = "";
var firstTrain = "00:00";
var frequency = "";


var firebaseConfig = {
    apiKey: "AIzaSyDeQzA0lijlZUSw4QPXk43woeWZTx0He2M",
    authDomain: "project-2f099.firebaseapp.com",
    databaseURL: "https://project-2f099.firebaseio.com",
    projectId: "project-2f099",
    storageBucket: "project-2f099.appspot.com",
    messagingSenderId: "632750689783",
    appId: "1:632750689783:web:ef4416102b20a1c2"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();




$("#submit").on("click", function () {
    event.preventDefault()

    trainName = $("#nameSearch").val().trim();
    destination = $("#destinationSearch").val().trim();
    firstTrain = $("#firstTrainSearch").val().trim();
    frequency = $("#frequencySearch").val().trim();


    reset();

    database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


});

function reset() {
    $("#nameSearch").val("");
    $("#destinationSearch").val("");
    $("#firstTrainSearch").val("");
    $("#frequencySearch").val("");
}

database.ref().on("child_added", function (snapshot) {
    console.log('child_added', snapshot);
    var sv = snapshot.val()

    //trainTime pushed back a year so it comes before current time
    var trainTimeCon = moment(sv.firstTrain, "HH:mm").subtract(1, "years")
    console.log(trainTimeCon)

    //sets current time to current time(moment)
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    //difference in current time v. train time converted in minutes
    var diffTime = moment().diff(moment(trainTimeCon), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime)

    //this gets the modulus remainder thing from the train frequency value??
    var tRemainder = diffTime % sv.frequency;
    console.log(tRemainder);

    //minutes till the train comes calculation
    var tMinutesTillTrain = sv.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //
    var nextTrain = moment(moment().add(tMinutesTillTrain, "minutes")).format('HH:mm');
    // console.log('ARRIVAL TIME: ' + moment(nextTrain).format('HH:mm'));



    newDiv = $(`
        <tr>
        <th> ${sv.name} </th>
        <th> ${sv.destination}</th>
        <th> ${"Every " + sv.frequency + " mins"}</th>
        <th> ${nextTrain}</th>
        <th> ${tMinutesTillTrain}</th>
        </tr>
            `)

    $("#list").append(newDiv)

})


