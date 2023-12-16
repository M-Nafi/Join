function loadTaskOpen(id) {
    let tasks = addedTasks.filter((t) => t["id"] === id);
    document.getElementById('task_overlay_bg').innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
        // let id = task['id'];
        // let bucket = task['bucket'];
        let title = task['title'];
        let description = task['description'];
        let prio = task['prio'];
        let duedate = formatDueDate(task['duedate']);
        let category = task['category'];
        let subtasks = task['subtask'];
        let assigneds = task['assigned'];
        showFrame('task_overlay_bg');
        addOverlayBg('task_overlay_bg');
        loadTask(id, title, description, prio, category, subtasks, assigneds, duedate);
        frameSlideIn('task_open_overlay_frame');
    }
}


function loadTask(id, title, description, prio, category, subtasks, assigneds, duedate) {
    let categoryColor = loadCategoryColor(category);
    document.getElementById('task_overlay_bg').innerHTML = 
    generateOpenTaskHTML(id, title, description, category, categoryColor, duedate);
    loadTaskOpenPrio(prio, 'task_open_prio');
    loadAssignedsOpenTask(assigneds, id);
    loadSubtasks(subtasks, 'task_overlay_subtasks_container', id);
}

function loadTaskOpenPrio(prio, id) {
    let taskPrioIcon = document.getElementById(id);
    if (prio === "Urgent") {
        taskPrioIcon.innerHTML = `<div>${prio}</div> ${generateUrgentPrioIcon()}`;
    } else if (prio === "Medium") {
        taskPrioIcon.innerHTML = `<div>${prio}</div> ${generateMediumPrioIcon()}`;
    } else if (prio === "Low") {
        taskPrioIcon.innerHTML = `<div>${prio}</div> ${generateLowPrioIcon()}`;
    }
}

function loadAssignedsOpenTask(assigneds, id) {
    let assigned = document.getElementById('assigned_to_contacts_task_open');
    assigned.innerHTML = "";
    for (let i = 0; i < assigneds.length; i++) {
        let badgeColor = getRandomColor();
        let assignedUserName = assigneds[i];
        let userBadge = generateUserBadge(assignedUserName);
        assigned.innerHTML +=
        generateAssigmentHTML(userBadge, badgeColor, assignedUserName, id);
    };
}

function loadSubtasks(subtasks, elementID, index) {
    let subtasksContainer = document.getElementById(elementID);
    subtasksContainer.innerHTML = "";
    if(subtasks.length > 0) {
        for (let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];
            let subdone = subtask['subdone'];
            let subtitle = subtask['subtitle'];
            subtasksContainer.innerHTML += checkSubtask(subdone, subtitle, i, index);
        }
    } else
    {
        clearElement('label_task_open_subtask');
    }
}

function checkSubtask(subdone, subtitle, i, index) {
    if (subdone) {
        return generateSubtasksCheckedHTML(subtitle, i, index);
    } else
    {
        return generateSubtasksHTML(subtitle, i, index);
    }
}

function clearElement(id) {
    document.getElementById(id).innerHTML = "";
}

function changeSubtaskConfirmation(id, i, j) {
    let checkSubtask = document.getElementById(id);
    let subtask = addedTasks[j].subtask[i];
    if(checkSubtask.checked) {
        subtask['subdone'] = true;
    } else if (!checkSubtask.checked)
    {
        subtask['subdone'] = false;
    }
}

// Load Edit Task Section

function loadTaskEdit(id) {
    let tasks = addedTasks.filter((t) => t["id"] === id);
    document.getElementById('task_overlay_bg').innerHTML = "";
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
        // let id = task['id'];
        // let bucket = task['bucket'];
        let title = task['title'];
        let description = task['description'];
        let prio = task['prio'];
        let duedate = task['duedate'];
        let category = task['category'];
        let subtasks = task['subtask'];
        let assigneds = task['assigned'];
        initEditTask(id, title, description, prio, category, subtasks, assigneds, duedate);
    }
}

function initEditTask(id, title, description, prio, category, subtasks, assigneds, duedate) {
    let categoryColor = loadCategoryColor(category);
    document.getElementById('task_overlay_bg').innerHTML = 
    generateEditTaskHTML(id, title, description, category, categoryColor, duedate);
    loadAllUsersForContactOnAssignedTo('et_contact_overlay', id);
    setTodayDateForCalendar('calendar_edit_task');
    loadPrioOnEditTask(prio);

}

function loadPrioOnEditTask(prio) {
    if (prio === "Urgent") {
        changePrioBtnColor('urgent-btn-edit');
    } else if (prio === "Medium") {
        changePrioBtnColor('medium-btn-edit');
    } else if (prio === "Low") {
        changePrioBtnColor('low-btn-edit');
    }
}

let isCantactOpen = true
function openContactOverlay(containerID) {
    if(isCantactOpen) {
        show(containerID);
        isCantactOpen = false;
    } else {
        hide(containerID);
        isCantactOpen = true;
    }
}

function loadAllUsersForContactOnAssignedTo(containerID, ID) {
    let contactsContainer = document.getElementById(containerID);
    contactsContainer = "";
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]['name'];
        let userBadge = generateUserBadge(userName);
        // let badgeColor = users[i]['bgcolor'];
        contactsContainer.innerHTML += generateEditTaskAssigmentContactsHTML(userBadge, userName, i, ID);
    }

}