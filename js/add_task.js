let tasks = [];
let addedSubtasks = [];



// function for prio area
function changePrioColor(prio) {
  let container = document.getElementById(prio + '_container');
  let img = document.getElementById(prio + '_img');
  if (container.classList.contains('selected')) {
    settingPrioBackground(container, img, prio, false);
    container.classList.remove('selected');
  } else {
    resetContainers();
    container.classList.add('selected');    
    let color = determinePrioBackgroundColor(prio);
    container.style.backgroundColor = color;
    container.style.color = 'white';
    img.src = './img/' + prio + '-white.svg';
  }
}

// function for prio area
function settingPrioBackground(container, img, prio) {
  container.style.backgroundColor = 'white';
  container.style.color = '#2a3647';
  img.src = './img/' + prio + '.svg';
}

// function for prio area
function determinePrioBackgroundColor(prio) {
  let color;
  if (prio === 'urgent') {
    color = '#ff3d00';
  } else if (prio === 'medium') {
    color = '#ffa800';
  } else if (prio === 'low') {
    color = '#7ae229';
  }
  return color;
}

// function for prio area
function resetContainers() {
  let containers = document.getElementsByClassName('status-definition-container');
  for (let i = 0; i < containers.length; i++) {
    let container = containers[i];
    container.style.backgroundColor = 'white';
    container.style.color = '#2a3647';
    let img = container.getElementsByClassName('prio-images')[0];
    img.src = './img/' + container.id.replace('_container', '') + '.svg';
    container.classList.remove('selected');
  }
}

// function for celaring all fields after already named
function clearAllFields() {
  document.getElementById('enter_title_field').value = '';
  document.getElementById('enter-description_field').value = '';
  document.getElementById('select_contacts_field').selectedIndex = 0;
  document.getElementById('date_field').value = '';  
  resetContainers();  
  document.getElementById('select_category_field').selectedIndex = 0;
  document.getElementById('add_new_subtask_field').value = '';
  document.getElementById('select_contacts_field').value = '';
  closeSubtaskIcons();
  document.getElementById('subtask_display_container').innerHTML = '';    
  addedSubtasks = [];   
}

async function taskToRemoteStorage(){
  users.push({
    title: id.value,
    description: id.value,
    password: sign_password.value,
  });
  await setItem('tasks', JSON.stringify(users));
}

// function for display date today and future
function getDateToday(){
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("date_field").setAttribute('min', today);
}

// function to change the subtask icons for adding 
function changingSubtaskIcons() {
  let inputField = document.getElementById('add_new_subtask_field');
  document.getElementById('normal_subtask_icon').classList.add('d-none');
  document.getElementById('three_subtask_icons').classList.remove('d-none');     
  inputField.focus(); 
  inputField.select(); 
}

// function to close the adding icons and back to normal 
function closeSubtaskIcons() {
  document.getElementById('normal_subtask_icon').classList.remove('d-none');
  document.getElementById('three_subtask_icons').classList.add('d-none');  
  let input = document.getElementById('add_new_subtask_field');
  input.value = '';
}

// function for handling some Subtask
function handleSubtaskActions() {
  let subtaskInput = document.getElementById('add_new_subtask_field');
  let subtask = subtaskInput.value.trim(); 
  changingSubtaskIcons();
  if (subtask !== '') {
    addedSubtasks.push(subtask); 
    displaySubtasks(); 
    input.value = '';       
  }
}

function displaySubtasks() {
  let subtask = document.getElementById('add_new_subtask_field').value.trim();
  if (subtask !== '') {
    addedSubtasks.push(subtask);
    renderAddedSubtasks();
    document.getElementById('add_new_subtask_field').value = '';
  }
}

function renderAddedSubtasks() {
  let subtaskContainer = document.getElementById('subtask_display_container');
  subtaskContainer.innerHTML = '';
  for (let i = 0; i < addedSubtasks.length; i++) {
    let subtask = addedSubtasks[i];
    let subtaskDiv = createAddedSubtask(subtask, i);
    subtaskContainer.innerHTML += subtaskDiv.outerHTML;
  }
  subtaskContainer.classList.remove('d-none');
  closeSubtaskIcons();  
}

function createAddedSubtask(subtask, index) {
  let subtaskDiv = document.createElement('div');
  subtaskDiv.classList.add('added-subtask');
  subtaskDiv.innerHTML = `<input id="input_${index}" class="subtask-input" type="text" value="• ${subtask}" contenteditable="true">
    <div class="added-subtask-icons">
      <img id="subtask_icons_3_${index}" onclick="deleteAddedSubtask('${subtask}')" class="invisible subtask-icon" src="./img/delete-icon.svg">
      <img id="subtask_icons_2_${index}" class="invisible vector-line" src="./img/vector-line.svg">
      <img id="subtask_icons_1_${index}" onclick="editAddedSubtask(${index})" class="invisible subtask-icon" src="./img/pencil-icon.svg">
      <img id="check_dark_save_${index}" class="invisible subtask-icon d-none" src="./img/check-dark.svg">      
    </div>`;
  return subtaskDiv;
}

function editAddedSubtask(index) {  
  let editIcon = document.getElementById(`subtask_icons_1_${index}`);
  let deleteIcon = document.getElementById(`subtask_icons_3_${index}`);
  let saveIcon = document.getElementById(`check_dark_save_${index}`);
  let vectorLine = document.getElementById(`subtask_icons_2_${index}`);
  let container = editIcon.parentElement;
  container.insertBefore(saveIcon, editIcon);
  container.insertBefore(vectorLine, editIcon);
  container.insertBefore(deleteIcon, editIcon);

  document.getElementById(`subtask_icons_1_${index}`).classList.add('d-none');  
  document.getElementById(`check_dark_save_${index}`).classList.remove('d-none');

  // Fokus auf das Eingabefeld und Textauswahl
  let inputField = document.getElementById(`input_${index}`);
  inputField.focus(); // Setzt den Fokus auf das Eingabefeld
  // inputField.select(); // Markiert den Text im Eingabefeld
}


function deleteAddedSubtask(subtask) {  
  let index = addedSubtasks.indexOf(subtask);  
  if (index !== -1) {    
    addedSubtasks.splice(index, 1);     
    renderAddedSubtasks();
  }
}

