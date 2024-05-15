// Open IndexedDB database
var request = window.indexedDB.open("ContactFormDB", 1); // Open or create database "ContactFormDB" with version 1
var db; // Declare a variable to hold the database object

request.onerror = function(event) {
    console.log("Database error: " + event.target.errorCode); // Log error if opening database fails
};

request.onupgradeneeded = function(event) {
    db = event.target.result; // Assign the result of opening the database to the db variable
    // Create object store and indexes if the database version changes
    var objectStore = db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("surname", "surname", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });
    objectStore.createIndex("campus", "campus", { unique: false });
    objectStore.createIndex("inquiries", "inquiries", { unique: false });
    objectStore.createIndex("suggestions", "suggestions", { unique: false });
    objectStore.createIndex("feedback", "feedback", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result; // Assign the result of opening the database to the db variable
    console.log("Database opened successfully"); // Log success message
};

function addContact() {
    var transaction = db.transaction(["contacts"], "readwrite"); // Start a transaction to perform database operations
    var objectStore = transaction.objectStore("contacts"); // Access the object store

    var formData = {
        // Get form data from HTML inputs
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("email").value,
        campus: document.getElementById("campus").value,
        inquiries: document.getElementById("inquiries").value,
        suggestions: document.getElementById("suggestions").value,
        feedback: document.getElementById("feedback").value
    };

    var request = objectStore.add(formData); // Add form data to the object store

    request.onsuccess = function(event) {
        console.log("Contact added to database"); // Log success message
        clearFields(); // Call the function to clear fields
        showMessage("Contact submitted successfully.", "white"); // Show success message
    };

    request.onerror = function(event) {
        console.log("Error adding contact: " + event.target.errorCode); // Log error if adding contact fails
    };
}

function clearFields() {
    document.getElementById("contact").reset(); // Reset form fields
}

function showMessage(message, color) {
    var messageElement = document.getElementById("message");
    messageElement.textContent = message; // Set message text
    messageElement.style.color = color; // Set color of the message
}