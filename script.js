const todoInput = document.getElementById("todo");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const deleteAllBtn = document.getElementById("deleteAllBtn");


deleteAllBtn.addEventListener("click", () => {
  const todoItems = document.querySelectorAll("#todoList li");
  todoItems.forEach((todo) => {
    todo.remove();
  });
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    const todo = document.createElement("li");
    todo.innerText = todoText;

    todo.addEventListener("click", () => {
      todo.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      todo.remove();
    });

    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
  }
});
// เพิ่มฟังก์ชั่นสำหรับลบรายการออกจาก Todo List
function deleteTodoItem(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

// อัพเดทฟังก์ชั่น renderTodoList เพื่อให้แสดงปุ่มลบสำหรับแต่ละรายการ Todo
function renderTodoList() {
  const todoListUl = document.querySelector("#todo-list");
  todoListUl.innerHTML = "";

  todoList.forEach((todoItem, index) => {
    const todoListItem = document.createElement("li");

    // สร้าง element span เพื่อแสดงข้อความ Todo
    const todoListItemText = document.createElement("span");
    todoListItemText.innerText = todoItem;

    // สร้างปุ่มลบแต่ละรายการ Todo
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "ลบ";
    deleteBtn.addEventListener("click", () => {
      deleteTodoItem(index);
    });

    todoListItem.appendChild(todoListItemText);
    todoListItem.appendChild(deleteBtn);

    todoListUl.appendChild(todoListItem);
  });
}

// อัพเดทฟังก์ชั่น handleFormSubmit เพื่อเพิ่มปุ่มลบให้กับรายการ Todo ใหม่
function handleFormSubmit(event) {
  event.preventDefault();

  const todoInput = document.querySelector("#todo-input");
  const todoItem = todoInput.value;

  if (todoItem !== "") {
    todoList.push(todoItem);
    renderTodoList();
    todoInput.value = "";
    todoInput.focus();
  }
}

const todoForm = document.querySelector("#todo-form");
todoForm.addEventListener("submit", handleFormSubmit);
