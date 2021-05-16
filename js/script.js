{
    const tasks = [];

    const clearInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    };

    const bindButtonEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (task of tasks) {
            htmlString += `
            <li class="list__item">
               <button class="list__button list__button--done js-done">
                  ${task.done ? "✓" : " "}
               </button>

               <span class="list__span js-taskContent"></span>
                  ${task.content}
               
               <button class="list__button list__button--remove js-remove">🗑</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindButtonEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTask = document.querySelector(".js-newTask");

        if (newTaskContent) {
            addNewTask(newTaskContent);
        }

        clearInput(newTask);
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}