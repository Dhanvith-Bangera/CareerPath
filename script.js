
let goals = JSON.parse(localStorage.getItem("careerGoals")) || [];

function saveGoals() {
    localStorage.setItem("careerGoals", JSON.stringify(goals));
}

function addGoal() {
    let title = document.getElementById("goalTitle").value.trim();
    let task = document.getElementById("taskInput").value.trim();

    if (title === "" || task === "") {
        alert("Please enter both a goal and a task!");
        return;
    }

    let existingGoal = goals.find(
        goal => goal.title.toLowerCase() === title.toLowerCase()
    );

    if (existingGoal) {
        existingGoal.tasks.push({
            name: task,
            completed: false
        });
    } else {
        goals.push({
            title: title,
            tasks: [{
                name: task,
                completed: false
            }]
        });
    }

    document.getElementById("goalTitle").value = "";
    document.getElementById("taskInput").value = "";

    saveGoals();
    displayGoals();
}

function toggleTask(goalIndex, taskIndex) {
    goals[goalIndex].tasks[taskIndex].completed =
        !goals[goalIndex].tasks[taskIndex].completed;

    saveGoals();
    displayGoals();
}

function deleteGoal(index) {
    goals.splice(index, 1);
    saveGoals();
    displayGoals();
}

function displayGoals() {
    let goalList = document.getElementById("goalList");
    goalList.innerHTML = "";

    goals.forEach((goal, goalIndex) => {
        let completed = goal.tasks.filter(
            task => task.completed
        ).length;

        let total = goal.tasks.length;
        let percentage = Math.round((completed / total) * 100);

        let card = document.createElement("div");
        card.className = "goal-card";

        let heading = document.createElement("h3");
        heading.textContent = goal.title;
        card.appendChild(heading);

        let progressText = document.createElement("p");
        progressText.textContent =
            `Progress: ${percentage}% (${completed}/${total} tasks)`;
        card.appendChild(progressText);

        let bar = document.createElement("div");
        bar.className = "progress-bar";

        let fill = document.createElement("div");
        fill.className = "progress";
        fill.style.width = percentage + "%";

        bar.appendChild(fill);
        card.appendChild(bar);

        goal.tasks.forEach((task, taskIndex) => {
            let taskDiv = document.createElement("div");
            taskDiv.className = "task";

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", () => {
                toggleTask(goalIndex, taskIndex);
            });

            let label = document.createElement("label");
            label.textContent = task.name;

            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(label);
            card.appendChild(taskDiv);
        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Goal";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteGoal(goalIndex);
        });

        card.appendChild(deleteButton);
        goalList.appendChild(card);
    });
}

displayGoals();
