function loadTaskOverlay(id) {
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