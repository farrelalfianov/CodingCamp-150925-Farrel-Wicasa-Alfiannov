document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const errorMessage = document.getElementById("error-message");
  const todoList = document.getElementById("todo-list");
  const filterInput = document.getElementById("filter-input");
  const filterDate = document.getElementById("filter-date");
  const clearFilterBtn = document.getElementById("clear-filter");

  let todos = [];

  function renderTodos(filterKeyword = "", filterDateValue = "") {
    todoList.innerHTML = "";
    let filteredTodos = todos;

    if (filterKeyword.trim() !== "") {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.text.toLowerCase().includes(filterKeyword.trim().toLowerCase())
      );
    }

    if (filterDateValue !== "") {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.date === filterDateValue
      );
    }

    if (filteredTodos.length === 0) {
      todoList.innerHTML =
        '<li style="text-align:center;color:#718096;">No task found</li>';
      return;
    }

    filteredTodos.forEach((todo, idx) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const todoTextDiv = document.createElement("div");
      todoTextDiv.className = "todo-text";
      todoTextDiv.innerHTML = `<span>${todo.text}</span><span class="todo-date">${todo.date}</span>`;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "-";
      deleteBtn.onclick = function () {
        todos.splice(idx, 1);
        renderTodos(filterInput.value, filterDate.value);
      };

      li.appendChild(todoTextDiv);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    errorMessage.textContent = "";

    const text = todoInput.value.trim();
    const date = dateInput.value;

    // Input validation
    if (text.length === 0) {
      errorMessage.textContent = "To-Do cannot be empty.";
      todoInput.focus();
      return;
    }
    if (date.length === 0) {
      errorMessage.textContent = "Please select a date.";
      dateInput.focus();
      return;
    }

    todos.push({ text, date });
    todoInput.value = "";
    dateInput.value = "";
    renderTodos(filterInput.value, filterDate.value);
  });

  filterInput.addEventListener("input", function () {
    renderTodos(filterInput.value, filterDate.value);
  });

  filterDate.addEventListener("change", function () {
    renderTodos(filterInput.value, filterDate.value);
  });

  clearFilterBtn.addEventListener("click", function () {
    filterInput.value = "";
    filterDate.value = "";
    renderTodos();
  });

  renderTodos();
});
