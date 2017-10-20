/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC0eQ4zOGDSvi7omfIvvUPtTR0QupCpL2c",
  authDomain: "train-times-ae97c.firebaseapp.com",
  databaseURL: "https://train-times-ae97c.firebaseio.com",
  projectId: "train-times-ae97c",
  storageBucket: "train-times-ae97c.appspot.com",
  messagingSenderId: "943326106166"
};
firebase.initializeApp(config);




var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var empRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

  // Prettify the employee start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>"  + empMonths + "</td><td>" + empRate);

  var firstTime = "03:00";
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("'MMMM Do YYYY, h:mm:ss a'"));
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  var tRemainder = diffTime % empRate;
      console.log(tRemainder);
      // Minute Until Train
      var tMinutesTillTrain = empRate - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      document.getElementById("demas").innerHTML = "MINUTES TILL LAST ENTERED TRAIN: " + tMinutesTillTrain;
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      document.getElementById("demo").innerHTML = "ARRIVAL TIME OF LAST ENTERED TRAIN: " + moment(nextTrain).format("hh:mm");

});
//var currentTime = prompt("What time is it(in military time)?");
//var everMin = prompt("Every how many minutes does your train come?");

// function timeNextTrain() {
//
//   var startTrain = 300;
//   while (startTrain < currentTime) {
//
//     startTrain = startTrain + 17;
//     if (startTrain > currentTime) {
//     alert(" you're next train will be at : " + startTrain);
//     }
//   }
// }
// function timeNextTrain(){
// var firstTime = "03:00";
// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
// console.log(firstTimeConverted);
// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("'MMMM Do YYYY, h:mm:ss a'"));
// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);
// var tRemainder = diffTime % empRate;
//     console.log(tRemainder);
//     // Minute Until Train
//     var tMinutesTillTrain = empRate - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
//   }

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
