import { Task } from './task.js';

class TaskManager {
    constructor(taskInputId,taskLevelId,taskFormId, taskListId, storageKey) {
        this.taskInput = document.getElementById(taskInputId);
        this.taskLevel = document.getElementById(taskLevelId);
        this.taskForm = document.getElementById(taskFormId);
        this.taskList = document.getElementById(taskListId);
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
       this.taskLevel.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.addTask();
            }
        });
    }

    addTask() {
        const taskText =this.taskInput.value.trim();
        

        if (!taskText) return;

        const taskId = this.tasks.length + 1;
        const task = new Task(taskId, taskText, this.taskLevel.value);

        this.saveTasks(task);
        this.updateUI();

        this.taskInput.value = ''; // Réinitialisation du champ
    }

    saveTasks(task) {
        this.tasks.push(task); // Ajoute la nouvelle tâche
        this.tasks.sort((a, b) => {
            const levelOrder = { low: 1, medium: 2, high: 3 };
            return levelOrder[a.level] - levelOrder[b.level];
        });
        console.log(this.tasks);
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

        // Ajout de l'événement de suppression
        taskDiv.addEventListener('click', () => this.deleteTask(taskDiv, task.text));

        this.taskList.appendChild(taskDiv);
    }

    deleteTask(taskDiv, taskText) {
        // Supprime la tâche du DOM
        taskDiv.remove();

        // Supprime la tâche du tableau
        this.tasks = this.tasks.filter(task => task.text !== taskText);

        // Met à jour le localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    updateUI() {
        this.taskList.replaceChildren();
        this.tasks.forEach(task => this.createTaskElement(task));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TaskManager('daily-taskText','daily-taskLevel','daily-form-task', 'daily-tasks', 'daily-tasks');
    new TaskManager('weekly-taskText','weekly-taskLevel','weekly-form-task', 'weekly-tasks', 'weekly-tasks');
});
