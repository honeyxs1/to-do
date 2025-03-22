import Project from './Project';
import Todo from './todo-script';

let projects = JSON.parse(localStorage.getItem('projects')) || [];

function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function addProject(name) {
    const project = new Project(name);
    projects.push(project);
    saveProjects();
    renderProjects();
}

function addTodo(projectId, title, description, dueDate, priority) {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
        const todo = new Todo(title, description, dueDate, priority);
        project.todos.push(todo);
        saveProjects();
        renderTodos(projectId);
    }
}

function deleteProject(projectId) {
    projects = projects.filter(project => project.id !== projectId);
    saveProjects();
    renderProjects();
}

function deleteTodo(projectId, todoId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.todos = project.todos.filter(todo => todo.id !== todoId);
        saveProjects();
        renderTodos(projectId);
    }
}

function renderProjects() {
    const projectList = document.querySelector('.projectList');
    projectList.innerHTML = '';
    projects.forEach((project) => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.addEventListener('click', () => renderTodos(project.id));

        // Add delete button for project
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DEL';
        deleteButton.classList.add('delete-project-btn');
        deleteButton.dataset.projectId = project.id;
        li.appendChild(deleteButton);

        projectList.appendChild(li);
    });

    // Attach event listener for delete project buttons
    const deleteProjectButtons = document.querySelectorAll('.delete-project-btn');
    deleteProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent project selection
            const projectId = button.dataset.projectId;
            deleteProject(projectId);
        });
    });
}

function renderTodos(projectId) {
    const content = document.getElementById('content');
    const project = projects.find((p) => p.id === projectId);

    if (project) {
        content.innerHTML = `<h2>${project.name}</h2>
                          <button class="add-todo-btn" data-project-id="${project.id}">Add Todo</button>
                          <dialog class="add-todo-dialog">
                              <form class="add-todo-form">
                                  <label for="todoTitle">Title:</label>
                                  <input type="text" id="todoTitle" required><br><br>

                                  <label for="todoDescription">Description:</label>
                                  <textarea id="todoDescription"></textarea><br><br>

                                  <label for="todoDueDate">Due Date:</label>
                                  <input type="date" id="todoDueDate" required><br><br>

                                  <label for="todoPriority">Priority:</label>
                                  <select id="todoPriority">
                                      <option value="low">Low</option>
                                      <option value="medium">Medium</option>
                                      <option value="high">High</option>
                                  </select><br><br>

                                  <button type="button" class="cancel-todo">Cancel</button>
                                  <button type="submit" class="submit-todo">Add Todo</button>
                              </form>
                          </dialog>`;

        // Check if project.todos is defined and is an array before attempting to iterate
        if (project.todos && Array.isArray(project.todos)) {
            project.todos.forEach((todo) => {
                const todoElement = document.createElement('div');
                todoElement.innerHTML = `
          <h3>${todo.title}</h3>
          <p>${todo.description}</p>
          <p>Due: ${todo.getFormattedDate()}</p>
          <p>Priority: ${todo.priority}</p>
          <button class="delete-todo-btn" data-project-id="${projectId}" data-todo-id="${todo.id}">Delete Todo</button>
        `;
                content.appendChild(todoElement);
            });
        } else {
            // Handle the case where project.todos is undefined or not an array
            console.warn('No todos found or todos is not an array for project:', project);
        }

        // Add event listener for the "Add Todo" button
        const addTodoButton = content.querySelector('.add-todo-btn');
        // const dialog = content.querySelector('.add-todo-dialog'); // Get the dialog here

        if (addTodoButton) {  // Check if the button exists
            addTodoButton.addEventListener('click', () => {
                const dialog = content.querySelector('.add-todo-dialog');
                if (dialog) {  // Check if the dialog exists
                    dialog.showModal();
                } else {
                    console.error('Dialog element not found!');
                }
            });
        } else {
            console.error('Add Todo button not found!');
        }


        // Add event listeners for the todo dialog buttons
        const cancelTodoButton = content.querySelector('.cancel-todo');
        if (cancelTodoButton) {
            cancelTodoButton.addEventListener('click', (e) => {
                e.preventDefault();
                const dialog = content.querySelector('.add-todo-dialog');
                if (dialog) {
                    dialog.close();
                }
            });
        }

        const submitTodoButton = content.querySelector('.submit-todo');
        if (submitTodoButton) {
            submitTodoButton.addEventListener('click', (e) => {
                e.preventDefault();
                const dialog = content.querySelector('.add-todo-dialog');
                const projectId = addTodoButton.dataset.projectId;
                const title = document.getElementById('todoTitle').value;
                const description = document.getElementById('todoDescription').value;
                const dueDate = document.getElementById('todoDueDate').value;
                const priority = document.getElementById('todoPriority').value;

                addTodo(projectId, title, description, dueDate, priority);
                if (dialog) {
                    dialog.close();
                }
            });
        }


        // Add event listeners for delete todo buttons
        const deleteTodoButtons = content.querySelectorAll('.delete-todo-btn');
        deleteTodoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const todoId = button.dataset.todoId;
                const projectId = button.dataset.projectId;
                deleteTodo(projectId, todoId);
            });
        });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const addProjectDialog = document.querySelector('#projectDialog');
    const addProjectButton = document.getElementById('addProject');
    const cancelProjectButton = document.querySelector('.cancel-project');
    const submitProjectButton = document.querySelector('.submit-project');

    if (addProjectButton) {
        addProjectButton.addEventListener('click', () => {
            if (addProjectDialog) {
                addProjectDialog.showModal();
            }
        });
    }


    if (cancelProjectButton) {
        cancelProjectButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (addProjectDialog) {
                addProjectDialog.close();
            }

        });
    }


    if (submitProjectButton) {
        submitProjectButton.addEventListener('click', (e) => {
            e.preventDefault();
            const projectName = document.getElementById('projectTitle').value;
            addProject(projectName);
            if (addProjectDialog) {
                addProjectDialog.close();
            }

        });
    }


    renderProjects();
});
