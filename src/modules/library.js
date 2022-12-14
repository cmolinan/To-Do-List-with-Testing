// eslint-disable-next-line import/no-mutable-exports
let toDoList = [];

// eslint-disable-next-line import/no-mutable-exports
let todoEdit = null;
let isEditing = false;

// Storage
const saveData = () => {
  localStorage.setItem('listToDo', JSON.stringify(toDoList));
};

const getData = () => {
  const localFormData = JSON.parse(localStorage.getItem('listToDo'));
  if (localFormData == null) {
    toDoList = [];
  } else {
    toDoList = localFormData;
  }
};
// ----

// Preparations to edit a To-Do Item.
const editList = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const desc = document.getElementById('addToDo');
  desc.value = todo.description;
  desc.focus();
};

// Remove a To Do item
const removeList = (indexID) => {
  const desc = document.getElementById('addToDo');
  toDoList = toDoList.filter((ind) => ind.index !== indexID);
  toDoList = toDoList.map((todo, index) => ({
    description: todo.description,
    completed: todo.completed,
    index: index + 1,
  }));
  isEditing = false;
  desc.value = null;
  // eslint-disable-next-line no-use-before-define
  displayToDo();
};

// Updates after Changes at a Checkbox (for completed or not) for a To-Do item
const updateCheckbox = (index, state) => {
  for (let i = 0; i < toDoList.length; i += 1) {
    if (toDoList[i].index === index) {
      toDoList[i].completed = state;
      break;
    }
  }
  saveData();
};

// MAIN OBJECT
const displayToDo = () => {
  const itemsList = document.getElementById('detailedList');
  itemsList.innerHTML = '';

  // Dynamic generation of the To-Do List
  toDoList.forEach((data) => {
    const todoLiElement = document.createElement('li');
    todoLiElement.classList.add('item');
    const todoCheckboxElement = document.createElement('input');
    todoCheckboxElement.classList.add('checkInput');
    todoCheckboxElement.setAttribute('type', 'checkbox');
    todoCheckboxElement.setAttribute('name', 'checkbox');
    todoCheckboxElement.setAttribute('value', data.index);

    const todoDescriptionElement = document.createElement('p');
    todoDescriptionElement.classList.add('label');
    todoDescriptionElement.innerText = data.description;

    const actionBtns = document.createElement('div');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('hide');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.innerHTML = '<i class="fa fa-lg fa-trash">';

    const pointsBtn = document.createElement('button');
    pointsBtn.classList.add('more-btn');
    pointsBtn.setAttribute('type', 'button');
    pointsBtn.innerHTML = '<i class="fa fa-ellipsis-v pointsBtn"></i>';

    todoLiElement.appendChild(todoCheckboxElement);
    todoLiElement.appendChild(todoDescriptionElement);

    actionBtns.appendChild(deleteBtn);
    actionBtns.appendChild(pointsBtn);

    todoLiElement.appendChild(actionBtns);
    itemsList.appendChild(todoLiElement);

    const actions = () => {
      const desc = document.getElementById('addToDo');
      if (!isEditing) {
        deleteBtn.classList.toggle('hide');
        desc.value = null;
        isEditing = false;
        editList(data);
        pointsBtn.classList.toggle('hide');
      } else {
        displayToDo();
        desc.value = null;
        isEditing = false;
      }
    };

    if (data.completed) {
      todoCheckboxElement.checked = true;
      todoDescriptionElement.classList.add('changeChk');
    }

    // MENU LISTENERS

    // Listener for Delete btn
    todoCheckboxElement.addEventListener('change', () => {
      if (todoCheckboxElement.checked) {
        todoDescriptionElement.classList.add('changeChk');
      } else todoDescriptionElement.classList.remove('changeChk');
      updateCheckbox(data.index, todoCheckboxElement.checked);
    });

    // Listener for "Points" Menu
    pointsBtn.addEventListener('click', () => {
      actions();
    });

    // Listener for remove a To-Do item
    deleteBtn.addEventListener('click', () => {
      removeList(data.index);
    });

    // Listener double click on Item
    todoDescriptionElement.addEventListener('dblclick', () => {
      actions();
    });
  });

  saveData();
};
// End of Main Object

// Add New To-Do item
const addToDo = (value1) => {
  const desc = document.getElementById('addToDo');
  if (value1 !== '') {
    const completed = false;
    const description = value1;
    const index = toDoList.length + 1;
    toDoList.push({ completed, description, index });
    displayToDo();
    saveData();
    desc.value = null;
  }
  toDoList = toDoList.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
};

// Save an Edit a To-Do item
const saveEdit = (value1, index1) => {
  const desc = document.getElementById('addToDo');
  if (value1 !== '') {
    toDoList = toDoList.map((todo) => {
      if (todo.index === index1) {
        return { ...todo, description: value1 };
      }
      return todo;
    });
    displayToDo();
    saveData();
    desc.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

// Function: read variable isEditing
const getIsEditing = () => isEditing;

// remove and save Completed To-Do items. Then display List
const clearAllCompleted = () => {
  const desc = document.getElementById('addToDo');
  toDoList = toDoList.filter((todo) => !todo.completed);
  toDoList = toDoList.map(
    (todo, index) => (
      { completed: todo.completed, description: todo.description, index: index + 1 }
    ),
  );
  isEditing = false;
  desc.value = null;
  saveData();
  displayToDo();
};

export {
  toDoList, addToDo, removeList, saveEdit, updateCheckbox, getData, todoEdit,
  clearAllCompleted, displayToDo, getIsEditing,
};
