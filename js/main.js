import { Task } from './task.js';

class TaskManager {
    constructor(taskFormId, taskListClass, storageKey) {
        this.taskForm = document.getElementById(taskFormId);
        this.taskList = document.querySelector(`.${taskListClass} .task-list`);
        this.tasks = JSON.parse(localStorage.getItem(storageKey)) || [];
        this.storageKey = storageKey;
        this.addTaskEvent();
        this.updateUI();
    }

    addTaskEvent() {
        this.taskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addTask();
        });
    }

    addTask() {
        const taskInput = document.getElementById('taskText');
        const taskLevel = document.getElementById('taskLevel').value;
        const taskText = taskInput.value.trim() || 'No task';

        if (taskText === '') return;

        const taskId = this.tasks.length + 1;
        const task = new Task(taskId, taskText, taskLevel);

        this.saveTasks(task);
        this.updateUI();

        taskInput.value = ''; // Réinitialisation du champ
    }

    saveTasks(task) {
        this.tasks = [...this.tasks, task]; // Ajoute la nouvelle tâche
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskP = document.createElement('p');
        taskP.textContent = task.text;

        const taskIcon = document.createElement('i');
        taskIcon.classList.add('fa-solid', 'fa-circle', 'level');

        let color;
        if (task.level === 'low') color = 'green';
        else if (task.level === 'medium') color = 'orange';
        else color = 'red';

        taskIcon.style.color = color;

        taskDiv.appendChild(taskP);
        taskDiv.appendChild(taskIcon);
        this.taskList.appendChild(taskDiv);
    }

    updateUI() {
        this.taskList.replaceChildren();
        this.tasks.forEach((task) => this.createTaskElement(task));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TaskManager('form-task', 'daily', 'daily-tasks');
});
