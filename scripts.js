const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".task-container");

const validateInput = () => inputElement.value.trim().length > 0;

// Salvar no localStorage
const updateLocalStorage = () => {
  const tasks = [...taskContainer.children].map((task) => {
    const content = task.querySelector("p");
    return {
      description: content.innerText,
      isCompleted: content.classList.contains("completed"),
    };
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Criar tarefa
const createTaskElement = (text, isCompleted = false) => {
  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = text;

  if (isCompleted) {
    taskContent.classList.add("completed");
  }

  taskContent.addEventListener("click", () => {
    taskContent.classList.toggle("completed");
    updateLocalStorage();
  });

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-regular", "fa-trash-can");

  deleteItem.addEventListener("click", () => {
    taskItemContainer.remove();
    updateLocalStorage();
  });

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);
  taskContainer.appendChild(taskItemContainer);
};

// Adicionar nova tarefa
const handleAddTask = () => {
  if (!validateInput()) {
    inputElement.classList.add("error");
    return;
  }

  createTaskElement(inputElement.value);
  inputElement.value = "";
  updateLocalStorage();
};

const handleInputChange = () => {
  if (validateInput()) {
    inputElement.classList.remove("error");
  }
};

// Recarregar tarefas salvas
const refreshTasksUsingLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    createTaskElement(task.description, task.isCompleted);
  });
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", handleAddTask);
inputElement.addEventListener("input", handleInputChange);
