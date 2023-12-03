let currentDraggedElement;

function updateBoard(bucket) {
    let tasks = addedTasks.filter((t) => t["bucket"] == bucket);
    document.getElementById(bucket).innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
        let id = task['id'];
        let bucket = task['bucket'];
        let title = task['title'];
        let description = task['description'];
        let prio = task['prio'];
        let category = task['category'];
        let subtasks = task['subtask'];
        let assigneds = task['assigned'];
        loadCard(id,bucket, title, description, prio, category, subtasks, assigneds);
    }
}

/**
 * Saves the current task ID
 * @param {int} id - ID from the drag elements 
 */
function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * The position of the column is changed in the array and the board is reloaded
 * @param {String} bucket - HTML Id from the drop zone 
 */
function moveTo(bucket) {
    addedTasks[currentDraggedElement]["bucket"] = bucket;
    updateBoard(bucket);
    loadBoard();
}

/**
 * The target dropzone is highlighted when draging
 * @param {int} id - ID from the drag elements 
 */
function highlight(id) {
    document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * The target dropzone remove highlighted when element ist drop
 * @param {int} id - ID from the drag elements
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove("drag-area-highlight");
}


