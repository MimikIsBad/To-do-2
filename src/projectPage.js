export function loadProjectPage() {
    const projectDiv = document.getElementById("projectDisplay");
    projectDiv.style.display = 'block'; // Show project page list
    projectDiv.innerHTML = ``;

    const homePageDetails = document.getElementById("projectPage");
    homePageDetails.style.display = 'block'; // Ensure project page content is visible
    homePageDetails.innerHTML = `
        <div>
            <h1 class="title-home">My Projects</h1>
        </div>
        <div id="task-amount-projects">No projects</div>
    `;


    let projectDisplay = [];

    function projectList(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    function listLogic() {
        function displayItem() {

            function updateTaskAmount() {
                let listLength = projectDisplay.length;
                const taskAmount = document.getElementById("task-amount-projects");
                taskAmount.innerHTML = `${listLength} projects`;
            }

            projectDiv.innerHTML = ''; 
            updateTaskAmount()

            projectDisplay.forEach(function(item, index) {
                let itemContainer = document.createElement("div");
                itemContainer.classList.add("item-container");

                let titleElement = document.createElement("p");
                titleElement.textContent = `Title: ${item.title}`;
                itemContainer.appendChild(titleElement);

                let descElement = document.createElement("p");
                descElement.textContent = `Description: ${item.description}`;
                itemContainer.appendChild(descElement);

                let dueDateElement = document.createElement("p");
                dueDateElement.textContent = `Due Date: ${item.dueDate}`;
                itemContainer.appendChild(dueDateElement);

                let priorityElement = document.createElement("p");
                priorityElement.textContent = `Priority: ${item.priority}`;
                itemContainer.appendChild(priorityElement);

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("deleteBtn");
                deleteButton.textContent = "Delete Task";
                itemContainer.appendChild(deleteButton);

                deleteButton.addEventListener("click", function() {
                    projectDisplay.splice(index, 1);
                    displayItem();
                });

                projectDiv.appendChild(itemContainer);
            });
        }

        function setupFormListener() {
            const formElement = document.getElementById("formElement");

            // Remove existing submit event listeners
            const newFormElement = formElement.cloneNode(true);
            formElement.parentNode.replaceChild(newFormElement, formElement);

            function formSubmitHandler(e) {
                e.preventDefault();
                let title = document.getElementById("title").value;
                let desc = document.getElementById("desc").value;
                let priority = document.getElementById("priority").value;
                let dueDate = document.getElementById("dueDate").value;

                const newProjectList = new projectList(title, desc, dueDate, priority);
                projectDisplay.push(newProjectList);
                console.log(projectDisplay);

                displayItem();

                document.getElementById('formElement').style.display = 'none';
            }

            newFormElement.addEventListener("submit", formSubmitHandler);
        }

        setupFormListener();
        return { displayItem };
    }

    function buttonLogic() {
        function newBtn() {
            const newButton = document.getElementById("newBtn");
            newButton.removeEventListener('click', showForm);
            newButton.addEventListener('click', showForm);
        }

        function showForm() {
            document.getElementById('formElement').style.display = 'block';
        }

        function cancelBtn() {
            const cancelButton = document.getElementById('cancelBtn');
            cancelButton.removeEventListener('click', hideForm);
            cancelButton.addEventListener('click', hideForm);
        }

        function hideForm() {
            document.getElementById('formElement').style.display = 'none';
        }

        return { newBtn, cancelBtn };
    }

    const buttonControls = buttonLogic();
    const listControls = listLogic();

    buttonControls.newBtn();
    buttonControls.cancelBtn();
    listControls.displayItem();
}
