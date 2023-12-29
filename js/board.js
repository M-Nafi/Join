let addedTasks = [];


async function initBoard() {
    await loadAddedTasks();
    await loadUsers();
    loadBoard();
    loadCurrentUser();
    
}

/**
 * hidden function to clear Added Tasks Remote Storage from any information
 */
async function clearAddedTasksRemoteSTRG(){
    addedTasks = [];
    await setItem("addedTasks", JSON.stringify(addedTasks));
}


async function loadAddedTasks() {
    try {
        addedTasks = JSON.parse(await getItem("addedTasks"));
    } catch (e) {
      console.error("Loading Added Tasks error:", e);
    }
}


function loadBoard() {
    for (let i = 0; i < buckets.length; i++) {
        let bucket = buckets[i];
        updateBoard(bucket);
        loadNoTasksLabel(bucket);
    }
}

function loadCard(id, bucket, title, description, prio, category, subtasks, assigneds) {
    let categoryColor = loadCategoryColor(category);
    document.getElementById(bucket).innerHTML +=
    generateCardHTML(id, title, description, category, categoryColor);
    loadSubtaskprogress(subtasks, id);
    loadAssigneds(assigneds, id);
    loadCardPrioIcon(prio, id);
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
    if (allSubtask > 0) {
    document.getElementById(`subtasks_container_${id}`).innerHTML = 
    generateSubtaskProgressHTML(allSubtask, done);
    }
}

function loadAssigneds(assigneds, id) {
    for (let i = 0; i < assigneds.length; i++) {
        let badgeColor = getUserColor(assigneds, i);
        let assignedUserName = assigneds[i];
        let userBadge = generateUserBadge(assignedUserName);
        document.getElementById(`task_assignment_container_${id}`).innerHTML +=
        generateAssigmentBadgeHTML(userBadge, badgeColor);
    };
}

function loadCardPrioIcon(prio, id) {
    let taskPrioIcon = document.getElementById(`task_prio_img_${id}`);
    if (prio === "Urgent") {
        taskPrioIcon.innerHTML = generateUrgentPrioIcon();
    } else if (prio === "Medium") {
        taskPrioIcon.innerHTML = generateMediumPrioIcon();
    } else if (prio === "Low") {
        taskPrioIcon.innerHTML = generateLowPrioIcon();
    }
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

function loadCategoryColor(category) {
    if(category === 'Technical Task') {
        return '#1fd7c1';
    } else if (category === 'User Story') {
        return '#0038FF';
    }
}

function show(id) {
    document.getElementById(id).classList.remove('d-none');
}

function hide(id) {
    document.getElementById(id).classList.add('d-none');
}

function showFrame(id) {
    addOverlayBg(id);
    show(id);
}


async function deleteTask(TaskID) {
    let updatedAddedTasks = addedTasks.filter(task => task.id !== TaskID);
    addedTasks = updatedAddedTasks;
    hideTaskOpen('task_open_overlay_frame');
    loadBoard();
}


/**
 * returns the completed subtasks as a percentage
 * 
 * @param {int} allSubtask - All stubtasks of a task
 * @param {*} done  - all completed subtasks of a task
 * @returns 
 */
function generatePercentInWidth(allSubtask, done) {
    let percentInWidth = done / allSubtask * 100;
    return percentInWidth
}

function formatNoTaskLabelString(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1)
    let formattedStr = str.replace('-', ' ');
    return formattedStr;
}

function generateUserBadge(fullName) {
    let nameParts =  fullName.split(' ');
    let firstNameInitial = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() : '';
    let lastNameInitial = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : '';
    return firstNameInitial + lastNameInitial;
}

/**
 * Converts the date to the correct format
 * @param {string} dueDate - Contains the date from the DueDate specification
 * @returns 
 */
function formatDueDate(dueDate) {
    let dateParts = dueDate.split('-');
    let duedate = dateParts[2] + '/' + dateParts[1]+ '/' + dateParts[0];
    return duedate;
}

async function clearRemoteStorage() {
    users = [];
    await setItem("users", JSON.stringify(users));
}