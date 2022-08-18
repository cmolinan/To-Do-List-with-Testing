/**
 * @jest-environment jsdom
 */

import {
  toDoList, addToDo, removeList, saveEdit, updateCheckbox, clearAllCompleted,
} from '../src/modules/library.js';

document.body.innerHTML = `
  <section class="mainContainer">
  <h1>Today's To Do</h1>
  <div class="mainList">
      <div class="upperOfList" >
          <input class="addInput" id="addToDo" type="text" placeholder="Add your list ...">                
      </div>
      <ul id="detailedList"></ul>
      <div>
          <button type="button" class="clearAllBtn" id="clearAllBtn" > Clear all completed </button>
      </div>
  </div>
  </section>     
`;

const eraseToDoList = () => toDoList.splice(0, toDoList.length);

describe('Check add and remove', () => {
  test('Adding an item', () => {
    eraseToDoList();
    addToDo('Wash the laundry');
    addToDo('Travel to Arequipa');
    expect(toDoList).toHaveLength(2);
  });

  test('Removing a task', () => {
    eraseToDoList();
    addToDo('Save the Queen');
    addToDo('Jump to the sky');
    addToDo('Go to the beach');
    removeList(1);
    expect(toDoList).toHaveLength(2);
  });
});

describe('Editing, updating and clear completed tasks', () => {
  test('Edit an item', () => {
    eraseToDoList();
    addToDo('Wash the laundry');
    addToDo('Travel to Arequipa');
    saveEdit('Travel to Iquitos', 2);
    expect(toDoList[1].description).toBe('Travel to Iquitos');
  });

  test('Update a completed Task', () => {
    eraseToDoList();
    addToDo('Wash the laundry');
    addToDo('Travel to Iquitos');
    addToDo('Study for the test');
    updateCheckbox(2, true);
    expect(toDoList[1].completed).toBe(true);
  });

  test('Clear All Completed Tasks', () => {
    eraseToDoList();
    addToDo('Wash the laundry');
    addToDo('Travel to Iquitos');
    addToDo('Study for the test');
    addToDo('Save the Queen');
    addToDo('Jump to the sky');
    addToDo('Go to the beach');
    updateCheckbox(2, true);
    updateCheckbox(4, true);
    clearAllCompleted();
    expect(toDoList).toHaveLength(4);
  });

  test('Clear All Completed Tasks using DOM', () => {
    eraseToDoList();
    addToDo('Wash the laundry');
    addToDo('Travel to Gwalior');
    addToDo('Jump to the sky');
    addToDo('Go to the beach');
    updateCheckbox(1, true);
    updateCheckbox(4, true);
    clearAllCompleted();
    const liTasks = document.querySelectorAll('ul li');
    expect(liTasks).toHaveLength(2);
  });
});
