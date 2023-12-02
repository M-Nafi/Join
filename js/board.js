
function initBoard() {
    loadBoard();
    setTodayDateForCalendar();
}


function loadBoard() {
    for (let i = 0; i < buckets.length; i++) {
        let bucket = buckets[i];
        updateBoard(bucket);
        loadNoTasksLabel(bucket);
    }
}

function loadCard(id, bucket, title, description, prio, category, subtasks) {
    document.getElementById(bucket).innerHTML +=
    generateTaskHTML(id, title, description, prio, category);
    loadSubtaskprogress(subtasks, id);
}

function loadNoTasksLabel(bucket) {
    let taskColumn = document.getElementById(bucket);

    if (taskColumn.innerHTML === '') {
        let formatBucket = formatNoTaskLabelString(bucket);
        taskColumn.innerHTML = generateNoTaskHTML(formatBucket);
    }
}

function loadSubtaskprogress(subtasks, id) {
    let allSubtask = subtasks.length;
    let done = loadSubtaskAreDone(subtasks);
    document.getElementById(`subtasks_container_${id}`).innerHTML = 
    generateSubtaskProgress(allSubtask, done);


}

function loadSubtaskAreDone(subtasks) {
    let done = 0;
    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        if (subtask.subdone){
            done++
        }
    }
    return done;
}

/**
 * returns the completed subtasks as a percentage
 * @param {int} allSubtask - All stubtasks of a task
 * @param {*} done  - all completed subtasks of a task
 * @returns 
 */
function loadPercentInWidth(allSubtask, done) {
    let percentInWidth = done / allSubtask * 100;
    return percentInWidth
}


function formatNoTaskLabelString(str) {
      str = str.charAt(0).toUpperCase() + str.slice(1)
     let formattedStr = str.replace('-', ' ');
    return formattedStr;
  }