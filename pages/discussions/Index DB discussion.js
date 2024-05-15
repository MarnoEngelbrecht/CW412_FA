// Opens or creates the IndexDB database
var db;
var request = window.indexedDB.open("DiscussionDB", 1);

// This event handles the initial creation of the database
request.onupgradeneeded = function (event) {
    db = event.target.result;

    // Create an object store for comments
    var objectStore = db.createObjectStore("comments", { keyPath: "id", autoIncrement: true });

    // Create an index to search comments by user name
    objectStore.createIndex("userName", "userName", { unique: false });
};
 

// This event fires when the database is successfully opened
request.onsuccess = function (event) {
    db = event.target.result;
    console.log("IndexDB connection successful");

    // List comments in the console
    listCommentsFromDB();
    // console.log("success")
};

// This event handles any errors that occur during database creation/opening
request.onerror = function (event) {
    console.error("IndexDB error:", event.target.errorCode);
};

// Function to add a comment to the IndexDB
function addCommentToDB(userName, comment) {
    var transaction = db.transaction(["comments"], "readwrite");
    var objectStore = transaction.objectStore("comments");
    var newComment = { userName: userName, comment: comment };
    var request = objectStore.add(newComment);

    request.onsuccess = function () {
        console.log("Comment added to IndexDB");

        displayComment(userName, comment);
        const nameInput = document.getElementById('userName');
        const commentInput = document.getElementById('comment');
        nameInput.value = '';
        commentInput.value = '';
    };

    request.onerror = function (event) {
        console.error("Error adding comment to IndexDB:", event.target.error);
    };
}

// Function to display a single comment in the UI
function displayComment(userName, comment) {
    var commentContainer = document.getElementById("comments");
    var newComment = document.createElement("div");
    newComment.innerHTML = "<strong>" + userName + ":</strong>" + comment;
    commentContainer.appendChild(newComment);
}

// Function to list all comments from the IdexDB
function listCommentsFromDB() {
    var transaction = db.transaction(["comments"], "readwrite");
    var objectStore = transaction.objectStore("comments");
    var request = objectStore.getAll();

    request.onsuccess = function (event) {
        var comments = event.target.result;
        var commentContainer = document.getElementById("comments");
        commentContainer.innerHTML = '';
        comments.forEach(comment =>{
            var newComment = document.createElement("div");
            newComment.innerHTML = "<strong>" + comment.userName + ":</strong>" + comment.comment;
            commentContainer.appendChild(newComment);

        })
        

        console.log("Comments stored in IndexDB:");
        comments.forEach(function (comment) {
            console.log(comment.userName + ": " + comment.comment);
        });
    };

    request.onerror = function (event) {
        console.error("Error listing comments from IndexDB:", event.target.error);
    };


}
function handleSubmit(event) {
    event.preventDefault();
    var username = document.getElementById('userName').value;
    var comment = document.getElementById('comment').value;
    addCommentToDB(username, comment);
};

// const btnDiscussion = document.getElementById('btn-Discussion');

// btnDiscussion.addEventListener('click', function () {
//     handleSubmit();
// })

document.querySelector('form').addEventListener('submit', function (event) {
    handleSubmit(event);
});