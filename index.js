const todos = [];
let id = 0;

function addTodo(todo) {
  const todoObject = {
    id: id,
    title: todo,
    completed: false,
    timeTaken: Math.ceil(Math.random() * 100)
  };
  todos.unshift(todoObject);
  id++;
  updateTodoList();
}
const addButton = document.getElementById("add");
addButton.addEventListener("click", function () {
  const todoInput = document.getElementById("todo");
  const todoValue = todoInput.value;
  if (!todoValue) {
    alert("Please enter a todo task");
  } else {
    addTodo(todoValue);
  }
});

function deleteTodo(todo) {
  //Splice
  todos.splice(todo.id, 1);
  updateTodoList();
}

function completeTodo(todo) {
  todo.completed = true;
  updateTodoList();
}

function updateTodoList(arr) {
  const todosArr = arr || todos;
  const listElement = document.getElementById("list");
  listElement.innerHTML = "";
  //Iterate Over the Array todos
  for (let todo of todosArr) {
    const item = document.createElement("li");
    item.innerHTML = todo.title;
    if (todo.completed) {
      item.style.textDecoration = "line-through";
    }
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTodo(todo);
    });
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "Mark as Complete";
    completeButton.addEventListener("click", function () {
      completeTodo(todo);
    });
    item.appendChild(deleteButton);
    item.appendChild(completeButton);
    listElement.appendChild(item);
  }
  const timeTakenElement = document.getElementById("time");
  const totalTimeTaken = todosArr.reduce(function (previousResult, todo) {
    return previousResult + todo.timeTaken;
  }, 0);
  timeTakenElement.innerText = totalTimeTaken;
}

function filterTodos(type) {
  let filteredTodos = [];
  switch (type) {
    case "all":
      filteredTodos = todos;
      break;
    case "completed":
      //{id:, title, completed}
      filteredTodos = todos.filter(function (todo) {
        return todo.completed === true;
      });
      break;
    case "pending":
      filteredTodos = todos.filter(function (todo) {
        return todo.completed === false;
      });
      break;
    default:
      break;
  }
  updateTodoList(filteredTodos);
}

(function listenToFilters() {
  const allButton = document.getElementById("all");
  const completedButton = document.getElementById("completed");
  const pendingButton = document.getElementById("pending");
  allButton.addEventListener("click", function () {
    filterTodos("all");
  });
  completedButton.addEventListener("click", function () {
    filterTodos("completed");
  });
  pendingButton.addEventListener("click", function () {
    filterTodos("pending");
  });
})();

// [1,2,3,4]
//1. [1,4,9,16]
// When you want to perform operation on each and every element thrn
// use map
//2. [2,3,4]

//3. 10

// const arr = [1, 2, 3, 4];
// const totalSum = arr.reduce(function (previousResult, currentValue) {
//   return previousResult + currentValue;
// }, 0);
// console.log("Totasl Sum", totalSum);

// const newArr = arr.map(function (currentElement) {
//   return currentElement * currentElement;
// });
// console.log("Arr is", newArr);
// // Always length of initial Array== Length of Final Array

// const newArr2 = arr.filter(function (current) {
//   return current > 1;
// });

// console.log("Arr2", newArr2);
