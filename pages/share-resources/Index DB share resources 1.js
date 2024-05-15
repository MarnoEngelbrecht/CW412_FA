///////////////////////////////////////////////////////////////////////
// DB Setup 
///////////////////////////////////////////////////////////////////////

const dbName = "ResourceDB";
const storeName = "Resources";

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onerror = function (event) {
            console.error("Database error:", event.target.error);
            reject(event.target.error);
        };

        request.onupgradeneeded = function (event) {
            let db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
            // console.log('success')
        };
    });
}

///////////////////////////////////////////////////////////////////////
// Add Resource
///////////////////////////////////////////////////////////////////////

async function addResource() {
    // console.log("addResource() function called");
    const resourceName = document.getElementById('resourceName').value;
    const fileInput = document.getElementById('resourceFile');
    const file = fileInput.files[0];

    if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const fileContent = e.target.result;
            const db = await initDB();
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);

            store.add({
                name: resourceName,
                file: fileContent,
            });

            // console.log("Registtering tx.oncomplete event handler");
            tx.oncomplete = function () {
                // console.log("Resource added successfully!");
                displayResources();
                db.close();
                // console.log('success')
            };

            tx.onerror = function (event) {
                console.error("Error adding resource:", event.target.error);
            };
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please upload a PDF file.");
    }
}

///////////////////////////////////////////////////////////////////////
// Display Resource
///////////////////////////////////////////////////////////////////////

async function displayResources() {
    const db = await initDB();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = function (event) {
        const resources = event.target.result;
        const resourcesContainer = document.getElementById('resources');
        resourcesContainer.innerHTML = '';

        resources.forEach(resource => {
            const blob = new Blob([resource.file], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            resourcesContainer.innerHTML += `<div>${resource.name} - <a href="${url}" target ="_blank">View PDF</a></div>`;
        });
    };

    request.onerror = function (event) {
        console.error("Failed to retrieve resources:", event.target.error);
    };

    db.close();
}

const btnSubmit = document.getElementById('btn-submit');

btnSubmit.addEventListener('click', function () {
    addResourceAndDisplay();
})
function addResourceAndDisplay() {
    addResource().then(displayResources).catch(error => {
        console.error('Error adding resource:', error);
    });
}