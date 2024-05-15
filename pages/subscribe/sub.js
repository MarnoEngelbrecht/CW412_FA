let db;

const request = indexedDB.open('SubscriptionDatabase', 1);

request.onerror = function(event) {
    console.log("Error opening database.");
};

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('subscribers', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database opened successfully.");
    //addSubscriber();
};

// Function to add a subscriber to the database
function addSubscriber(name, email) {
    const transaction = db.transaction(['subscribers'], 'readwrite');
    const objectStore = transaction.objectStore('subscribers');
    const newSubscriber = {
        name: name,
        email: email
    };

    const request = objectStore.add(newSubscriber);
    request.onsuccess = function() {
        console.log('New subscriber added successfully.');
        showSuccessMessage();
    };

    request.onerror = function() {
        console.error('Error adding subscriber.');
    };
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const name = document.querySelector('input[name="Name"]').value;
    const email = document.querySelector('input[name="emailAddress"]').value;
    addSubscriber(name, email);
    document.querySelector('input[name="Name"]').value = '';
    document.querySelector('input[name="emailAddress"]').value = '';
}

// Function to show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'hidden';
}
        