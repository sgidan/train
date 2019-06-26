
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

    var trainName = "";
    var destination = "";
    var firstTrain = "00:00";
    var frequency = "";

    $("#submit").on("click", function () {
        event.preventDefault()

        trainName = $("#nameSearch").val().trim();
        destination = $("#destinationSearch").val().trim();
        firstTrain = $("#firstTrainSearch").val().trim();
        frequency = $("#frequencySearch").val().trim();

        database.ref().push({
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

    database.ref().on("child_added", function (snapshot) {
        
        var sv = snapshot.val()
        

        newDiv = $(`
        <tr>
        <th> ${sv.name}</th>
        <th> ${sv.destination}</th>
        <th> ${sv.firstTrain}</th>
        <th></th>
        <th> ${sv.frequency}</th>
        
        </tr>
            `)
        
        $("#list").append(newDiv)

    })