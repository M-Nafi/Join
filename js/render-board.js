let buckets = ['to-do', 'in-progress','await-feedback', 'done'];


/**
 * this function generates the HTML for the map in the board view
 * @param {int} id - number of the id for the drag and drop function
 * @param {string} bucket - Board ID as column name 
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} duedate - Card duedate
 * @param {string} prio - Card prio
 * @param {string} category - Task category
 * @returns - returns the html text
 */
function generateTaskHTML(id, title, description, prio, category) {
    return `
            <div class="task-card" id="task${id}" onclick="loadTask(${id})" ondragstart="startDragging(${id})"
            draggable="true">
            <div class="category-move-card-container">
                <div class="technical-task">${category}</div>
                <svg fill="#000000" width="1.6rem" height="1.6rem" viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg" class="mobile-move-card d-none"
                    onclick="switchToBucket(3, event)">
                    <path d="M4 14v2l-4-3 4-3v2h12v2H4zm8-12V0l4 3-4 3V4H0V2h12z"
                        fill-rule="evenodd"></path>
                </svg>
            </div>
            <!-- Title and Description -->
            <div class="task-title-and-description">
                <h4 class="task-title" title="${title}">${title}</h4>
                <div class="task-description">${description}</div>
            </div>
            <!-- Subtasks -->
            <div id="subtasks_container_${id}" class="subtasks-container">
            </div>
            
            <!-- Assignment -->
            
        </div>
    
    `;
}

/**
 * Generates the To Task HTML label if there are no cards on the column
 * @param {string} bucket - Board ID as column name 
 * @returns 
 */
function generateNoTaskHTML(bucket) {
    return `<div class="no-tasks">No tasks ${bucket}</div>`;
}

function generateSubtaskProgress(allSubtask, done){
    let percentInWidth = loadPercentInWidth(allSubtask, done);
    return `
        <div class="subtasks-progress-bar" title="${done}/${allSubtask} subtasks are done">
            <div class="progress" style="width: ${percentInWidth}%;"></div>
        </div>
        <div class="nowrap">${done}/${allSubtask} Subtasks</div>
    
    `;
}




//Template Jason
addedTasks = [{
    "id": 0,
    "bucket": "in-progress",
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "assigned": ["Jad El Nader", "Jonas Lambelet", "Heike Lüdemann"],
    "duedate": "2024-05-10",
    "prio": "Medium",
    "category": "User Story",
    "subtask": [
        {
            "subdone": true,
            "subtitle": "Implement Recipe Recommendation"
        },
        {
            "subdone": false,
            "subtitle": "Start Page Layout"
        }
    ]
},
{
    "id": 1,
    "bucket": "done",
    "title": "CSS Architecture Planning",
    "description": "Define CSS naming conventions and structure.",
    "assigned": ["Alexander Riedel"],
    "duedate": "2023-09-02",
    "prio": "Urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "subdone": true,
            "subtitle": "Establish CSS Methodology"
        },
        {
            "subdone": true,
            "subtitle": "Setup Base Styles"

        }
    ]
},
{
    "id": 2,
    "bucket": "todo",
    "title": "HTML Base Template Creation",
    "description": "Create reusable HTML base templates",
    "assigned": ["Alexander Riedel", "Heike Lüdemann"],
    "duedate": "2024-10-03",
    "prio": "Low",
    "category": "Technical Task",
    "subtask": []
},
{
    "id": 3,
    "bucket": "await-feedback",
    "title": "Daily Kochwelt Receipe",
    "description": "Implement daily receipe and portion calculator in JavaScript and HTML",
    "assigned": ["Alexander Riedel", "Jad El Nader", "Jonas Lambelet", "Heike Lüdemann"],
    "duedate": "2023-09-02",
    "prio": "Urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "subdone": true,
            "subtitle": "Establish CSS Methodology"
        },
        {
            "subdone": true,
            "subtitle": "Setup Base Styles"

        }
    ]
},
];


users = [
    {
        usertoken: "",
    },
];
