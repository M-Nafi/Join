let buckets = ['to-do', 'in-progress','await-feedback', 'done'];


/**
 * this function generates the HTML for the map in the board view
 * @param {int} id - number of the id for the drag and drop function
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} category - Task category
 * @param {string} categoryColor - Task categor color
 * @returns - returns the html text
 */
function generateCardHTML(id, title, description, category, categoryColor) {
    return `
            <div class="task-card" id="task${id}" onclick="loadTaskOpen(${id})" ondragstart="startDragging(${id})"
            draggable="true">
            <div class="category-move-card-container">
                <div class="task-category-label" style="background-color: ${categoryColor};">${category}</div>
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
            <div class="task-assignment-prio-container">
                <div id="task_assignment_container_${id}" class="task-assignments"></div>
                <!-- Prio -->
                <div id="task_prio_img_${id}"></div>
            </div>
            
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

function generateSubtaskProgressHTML(allSubtask, done){
    let percentInWidth = generatePercentInWidth(allSubtask, done);
    return `
        <div class="subtasks-progress-bar" title="${done}/${allSubtask} subtasks are done">
            <div class="progress" style="width: ${percentInWidth}%;"></div>
        </div>
        <div class="nowrap">${done}/${allSubtask} Subtasks</div>
    `;
}

function generateAssigmentBadgeHTML(userBadge, badgeColor) {
    return `<div style="background-color: ${badgeColor};" class="profile-badge">${userBadge}</div>`;
}

function generateMediumPrioIcon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="8" viewBox="0 0 18 8" fill="none">
        <g clip-path="url(#clip0_99462_2583)">
            <path d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z" fill="#FFA800"/>
            <path d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z" fill="#FFA800"/>
        </g>
        <defs>
            <clipPath id="clip0_99462_2583">
            <rect width="17" height="6.33333" fill="white" transform="translate(0.5 0.833252)"/>
            </clipPath>
        </defs>
    </svg>
    
    `;
}

function generateLowPrioIcon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
        <g clip-path="url(#clip0_99462_2611)">
            <path d="M8.99974 7.24524C8.80031 7.24557 8.60603 7.18367 8.44549 7.06863L0.876998 1.63467C0.778524 1.56391 0.695351 1.47498 0.632227 1.37296C0.569103 1.27094 0.527264 1.15784 0.5091 1.0401C0.472414 0.802317 0.534386 0.560105 0.681381 0.366747C0.828377 0.17339 1.04835 0.0447247 1.29292 0.00905743C1.53749 -0.0266099 1.78661 0.0336422 1.98549 0.176559L8.99974 5.2075L16.014 0.17656C16.1125 0.105795 16.2243 0.0545799 16.3431 0.02584C16.462 -0.00289994 16.5855 -0.00860237 16.7066 0.00905829C16.8277 0.0267189 16.944 0.0673968 17.0489 0.128769C17.1538 0.190142 17.2453 0.271007 17.3181 0.366748C17.3909 0.462489 17.4436 0.571231 17.4731 0.686765C17.5027 0.802299 17.5085 0.922362 17.4904 1.0401C17.4722 1.15784 17.4304 1.27094 17.3672 1.37296C17.3041 1.47498 17.221 1.56391 17.1225 1.63467L9.55398 7.06863C9.39344 7.18367 9.19917 7.24557 8.99974 7.24524Z" fill="#7AE229"/>
            <path d="M8.99998 12.0001C8.80055 12.0005 8.60628 11.9386 8.44574 11.8235L0.877242 6.38955C0.678366 6.24664 0.546029 6.03276 0.509344 5.79498C0.472658 5.5572 0.53463 5.31499 0.681625 5.12163C0.828621 4.92827 1.0486 4.79961 1.29317 4.76394C1.53773 4.72827 1.78686 4.78853 1.98574 4.93144L8.99998 9.96239L16.0142 4.93144C16.2131 4.78853 16.4622 4.72827 16.7068 4.76394C16.9514 4.79961 17.1713 4.92827 17.3183 5.12163C17.4653 5.31499 17.5273 5.5572 17.4906 5.79498C17.4539 6.03276 17.3216 6.24664 17.1227 6.38956L9.55423 11.8235C9.39369 11.9386 9.19941 12.0005 8.99998 12.0001Z" fill="#7AE229"/>
        </g>
        <defs>
            <clipPath id="clip0_99462_2611">
            <rect width="17" height="12" fill="white" transform="translate(0.5)"/>
            </clipPath>
        </defs>
    </svg>
    `;
}

function generateUrgentPrioIcon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
        <g clip-path="url(#clip0_99462_2667)">
            <path d="M9.00026 4.75476C9.19969 4.75443 9.39397 4.81633 9.55451 4.93137L17.123 10.3653C17.2215 10.4361 17.3046 10.525 17.3678 10.627C17.4309 10.7291 17.4727 10.8422 17.4909 10.9599C17.5276 11.1977 17.4656 11.4399 17.3186 11.6333C17.1716 11.8266 16.9516 11.9553 16.7071 11.9909C16.4625 12.0266 16.2134 11.9664 16.0145 11.8234L9.00026 6.7925L1.98602 11.8234C1.88754 11.8942 1.7757 11.9454 1.65687 11.9742C1.53803 12.0029 1.41455 12.0086 1.29345 11.9909C1.17235 11.9733 1.05602 11.9326 0.951088 11.8712C0.846159 11.8099 0.754691 11.729 0.681906 11.6333C0.609122 11.5375 0.556445 11.4288 0.526885 11.3132C0.497325 11.1977 0.491459 11.0776 0.509623 10.9599C0.527789 10.8422 0.569626 10.7291 0.632752 10.627C0.695876 10.525 0.779049 10.4361 0.877524 10.3653L8.44602 4.93137C8.60656 4.81633 8.80083 4.75443 9.00026 4.75476Z" fill="#FF3D00"/>
            <path d="M9.00002 -0.000121266C9.19945 -0.000455511 9.39372 0.0614475 9.55427 0.176482L17.1228 5.61045C17.3216 5.75336 17.454 5.96724 17.4907 6.20502C17.5273 6.4428 17.4654 6.68501 17.3184 6.87837C17.1714 7.07173 16.9514 7.20039 16.7068 7.23606C16.4623 7.27173 16.2131 7.21147 16.0143 7.06856L9.00002 2.03761L1.98577 7.06856C1.78689 7.21147 1.53777 7.27173 1.2932 7.23606C1.04863 7.20039 0.828657 7.07173 0.681662 6.87837C0.534667 6.68501 0.472695 6.4428 0.509379 6.20502C0.546065 5.96723 0.678402 5.75336 0.87728 5.61044L8.44577 0.176482C8.60631 0.0614474 8.80059 -0.000455546 9.00002 -0.000121266Z" fill="#FF3D00"/>
        </g>
        <defs>
            <clipPath id="clip0_99462_2667">
            <rect width="17" height="12" fill="white" transform="translate(17.5 12) rotate(-180)"/>
            </clipPath>
        </defs>
    </svg>
    `;
}


function generateTaskOverlayHTML(id, title, description, category, categoryColor, subtasks, assigneds, duedate) {
    return `
    <div id="ed_task_overlay_frame" class="task-overlay-frame-open">
                        <!-- tesk overlay tag -->
                        <div class="category-container-task-open">
                            <div class="category-tag-task-open"style="background-color: ${categoryColor};">${category}</div>
                            <div class="close-button" onclick="hideTaskOpen('ed_task_overlay_frame')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <mask id="mask0_99379_7049" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_99379_7049)">
                                        <path
                                            d="M12 13.4L7.10005 18.3C6.91672 18.4834 6.68338 18.575 6.40005 18.575C6.11672 18.575 5.88338 18.4834 5.70005 18.3C5.51672 18.1167 5.42505 17.8834 5.42505 17.6C5.42505 17.3167 5.51672 17.0834 5.70005 16.9L10.6 12L5.70005 7.10005C5.51672 6.91672 5.42505 6.68338 5.42505 6.40005C5.42505 6.11672 5.51672 5.88338 5.70005 5.70005C5.88338 5.51672 6.11672 5.42505 6.40005 5.42505C6.68338 5.42505 6.91672 5.51672 7.10005 5.70005L12 10.6L16.9 5.70005C17.0834 5.51672 17.3167 5.42505 17.6 5.42505C17.8834 5.42505 18.1167 5.51672 18.3 5.70005C18.4834 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4834 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4834 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4834 18.1167 18.3 18.3C18.1167 18.4834 17.8834 18.575 17.6 18.575C17.3167 18.575 17.0834 18.4834 16.9 18.3L12 13.4Z"
                                            fill="#2A3647" />
                                    </g>
                                </svg>
                            </div>

                        </div>
                        <!-- task overlay title -->
                        <div class="title-task-overlay-open">${title}</div>
                        <!-- task overlay description -->
                        <div class="desc-task-open">${description}</div>
                        <!-- task overlay duedate -->
                        <div class="subheader-task-open">
                            <div class="label-task-open">Due date:</div>
                            <div>${duedate}</div>
                        </div>
                        <!-- task overlay prio -->

                        <div class="subheader-task-open">
                            <div class="label-task-open">Priority:</div>
                            <div id="task_open_prio" class="prio-container-style-task-open">
                            </div>
                        </div>

                        <!-- task overlay assigned to -->
                        <div class="column-frame-container-task-open">
                            <div class="label-task-open">Assigned To:</div>
                            <div id="assigned_to_contacts_task_open">

                                <div class="assigned-to-contact-task-open">
                                    <div id="contect_badge0" class="contact-badge-task-open"
                                        style="background-color: rgb(180, 147, 161);">HL</div>
                                    <div class="contact-name-task-open">Heike Lüdemann </div>
                                </div>
                                <div class="assigned-to-contact-task-open">
                                    <div id="contect_badge0" class="contact-badge-task-open"
                                        style="background-color: rgb(180, 147, 161);">HL</div>
                                    <div class="contact-name-task-open">Heike Lüdemann </div>
                                </div>

                            </div>
                        </div>

                        <!-- task overlay subtasks-->
                        <div class="column-frame-container-task-open">
                            <div class="label-task-open">Subtasks</div>
                            <div id="task_overlay_subtasks_container">
                                <!-- substasks -->
                                <div class="log-in-checkbox">
                                    <input id="confirm" type="checkbox" />
                                    <label class="checkbox-hover" for="confirm">Remember me</label>
                                </div>

                            </div>
                        </div>
                        <div class="delete-edit-container-task-open">
                            <div id="delete_btn_task_open" class="del-ed-btn-task-open">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <mask id="mask0_99408_2217" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_99408_2217)">
                                        <path
                                            d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                                            fill="#2A3647" />
                                    </g>
                                </svg>
                                <div>Delete</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="24" viewBox="0 0 2 24"
                                fill="none">
                                <path d="M1 0V24" stroke="#D1D1D1" />
                            </svg>
                            <div id="edit_btn_task_open" class="del-ed-btn-task-open">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <mask id="mask0_99408_2223" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_99408_2223)">
                                        <path
                                            d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                            fill="#2A3647" />
                                    </g>
                                </svg>
                                <div>Edit</div>
                            </div>
                        </div>

                    </div>
                </div>
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
        },
        {
            "subdone": true,
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
    "prio": "Low",
    "category": "Technical Task",
    "subtask": [
        {
            "subdone": false,
            "subtitle": "Establish CSS Methodology"
        },
        {
            "subdone": false,
            "subtitle": "Setup Base Styles"

        }
    ]
},
{
    "id": 2,
    "bucket": "to-do",
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
