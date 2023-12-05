function loadTaskOverlay(id) {
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
        showFrame('task_overlay_bg');
        loadTask(id, title, description, prio, category, subtasks, assigneds, duedate);
        frameSlideIn('ed_task_overlay_frame');
    }
}


function loadTask(id, title, description, prio, category, subtasks, assigneds, duedate) {
    let categoryColor = loadCategoryColor(category);
    document.getElementById('task_overlay_bg').innerHTML = 
    generateTaskOverlayHTML(id, title, description, prio, category, categoryColor, subtasks, assigneds, duedate);
}

