let db;

const request = indexedDB.open('budget', 1);

// will emit if the database version changes
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_budget', { autoIncrement: true });
};

// upon a success
request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        uploadBudget();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// offline function
function saveRecord(record) {
    const transaction = db.transaction(['new_budget'], 'readwrite');

    const budgetObjectStore = transaction.objectStore('new_budget');

    budgetObjectStore.add(record);
}