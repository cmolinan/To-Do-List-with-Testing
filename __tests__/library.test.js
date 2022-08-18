/**
 * @jest-environment jsdom
 */

import {
  toDoList, addToDo, removeList,
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
});
