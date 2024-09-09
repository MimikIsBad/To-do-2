export function loadProjectPage() {
  const projectDiv = document.getElementById("projectDisplay");
  projectDiv.style.display = "block"; // Show project page list
  projectDiv.innerHTML = ``;

  const homePageDetails = document.getElementById("projectPage");
  homePageDetails.style.display = "block"; // Ensure project page content is visible
  homePageDetails.innerHTML = `
        <div>
            <h1 class="title-home">My Projects</h1>
        </div>
        <div id="task-amount-projects">No projects</div>
    `;

  let projectList = JSON.parse(localStorage.getItem("projectList")) || [];
  let currentEditId = null; // Track the ID of the item being edited

  function listItem(title, description, dueDate, priority, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id; // Add a unique ID
  }

  function saveToLocalStorage() {
    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  function listLogic() {
    function updateTaskAmount() {
      let listLength = projectList.length;
      const taskAmount = document.getElementById("task-amount-projects");
      taskAmount.innerHTML = `${listLength} tasks`;
    }

    function displayItem() {
      console.log("Displaying items. Current projectList:", projectList);
      projectDiv.innerHTML = "";
      updateTaskAmount();

      projectList.forEach(function (item) {
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");
        itemContainer.dataset.id = item.id; // Store the item's ID

        let titleElement = document.createElement("p");
        titleElement.textContent = `Title: ${item.title}`;
        titleElement.classList.add("titleEl");
        itemContainer.appendChild(titleElement);

        let descElement = document.createElement("p");
        descElement.textContent = `Description: ${item.description}`;
        descElement.classList.add("descEl");
        itemContainer.appendChild(descElement);

        let dueDateElement = document.createElement("p");
        dueDateElement.textContent = `Due Date: ${item.dueDate}`;
        dueDateElement.classList.add("dateEl");
        itemContainer.appendChild(dueDateElement);

        let priorityElement = document.createElement("p");
        priorityElement.textContent = `Priority: ${item.priority}`;
        priorityElement.classList.add("prorityEl");
        itemContainer.appendChild(priorityElement);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteBtn");
        deleteButton.textContent = "Delete Task";
        itemContainer.appendChild(deleteButton);

        deleteButton.addEventListener("click", function (event) {
          event.stopPropagation(); // Prevent the click from bubbling up to itemContainer
          projectList = projectList.filter((i) => i.id !== item.id); // Remove item from list
          saveToLocalStorage(); // Save to local storage
          displayItem();
        });

        itemContainer.addEventListener("click", function () {
          openEditPopup(item.id); // Open pop-up with the item's ID
        });

        projectDiv.appendChild(itemContainer);
      });
    }

    function setupFormListener() {
      const formElement = document.getElementById("formElement");
      const newFormElement = formElement.cloneNode(true);
      formElement.parentNode.replaceChild(newFormElement, formElement);

      newFormElement.addEventListener("submit", function (e) {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let desc = document.getElementById("desc").value;
        let priority = document.getElementById("priority").value;
        let dueDate = document.getElementById("dueDate").value;

        console.log(`Form submitted. Current edit ID: ${currentEditId}`);
        console.log(
          `Form values - Title: ${title} Description: ${desc} Due Date: ${dueDate} Priority: ${priority}`,
        );

        if (currentEditId === null) {
          const newListItem = new listItem(
            title,
            desc,
            dueDate,
            priority,
            Date.now(),
          ); // Use timestamp as unique ID
          console.log("Adding new task:", newListItem);
          projectList.push(newListItem);
        } else {
          const item = projectList.find((item) => item.id === currentEditId);
          if (item) {
            item.title = title;
            item.description = desc;
            item.dueDate = dueDate;
            item.priority = priority;
            console.log("Updated item:", item);
          }
        }
        currentEditId = null; // Reset currentEditId after saving
        clearForm(); // Clear form fields after saving
        saveToLocalStorage(); // Save to local storage
        displayItem();
        document.getElementById("formElement").style.display = "none";
      });
    }

    function clearForm() {
      document.getElementById("title").value = "";
      document.getElementById("desc").value = "";
      document.getElementById("priority").value = "";
      document.getElementById("dueDate").value = "";
    }

    setupFormListener();
    return { displayItem };
  }

  function buttonLogic() {
    function newBtn() {
      const newButton = document.getElementById("newBtn");
      newButton.removeEventListener("click", showForm);
      newButton.addEventListener("click", showForm);
    }

    function showForm() {
      document.getElementById("formElement").style.display = "inline-block";
    }

    function cancelBtn() {
      const cancelButton = document.getElementById("cancelBtn");
      cancelButton.removeEventListener("click", hideForm);
      cancelButton.addEventListener("click", hideForm);
    }

    function hideForm() {
      document.getElementById("formElement").style.display = "none";
    }

    return { newBtn, cancelBtn };
  }

  function openEditPopup(itemId) {
    const item = projectList.find((item) => item.id === itemId);
    if (item) {
      const itemEditContainer = document.getElementById("editTaskContainer");
      const blur = document.getElementById("overlay");
      const titleTask = document.getElementById("editTitle");
      const descTask = document.getElementById("editDesc");
      const editDate = document.getElementById("editDate");
      const editPriority = document.getElementById("editPriority");
      const saveBtn = document.getElementById("saveChanges");
      const xBtn = document.getElementById("xBtn");

      console.log(`Opening edit popup for item with ID: ${itemId}`);
      console.log("Opening edit popup for item:", item);

      currentEditId = itemId;

      titleTask.textContent = item.title; // Use textContent for divs
      descTask.textContent = item.description;
      editDate.value = item.dueDate; // Use value for inputs
      editPriority.value = item.priority; // Use value for inputs

      itemEditContainer.style.display = "block";
      blur.style.display = "block";

      saveBtn.addEventListener("click", function () {
        const editedItem = projectList.find(
          (item) => item.id === currentEditId,
        );
        if (editedItem) {
          console.log(`Saving changes for item with ID: ${currentEditId}`);
          editedItem.title = titleTask.textContent; // Use textContent for divs
          editedItem.description = descTask.textContent;
          editedItem.dueDate = editDate.value; // Use value for inputs
          editedItem.priority = editPriority.value; // Use value for inputs

          itemEditContainer.style.display = "none";
          blur.style.display = "none";
          currentEditId = null; // Reset currentEditId after saving
          saveToLocalStorage(); // Save to local storage
          listControls.displayItem(); // Call displayItem from listControls
        }
      });

      xBtn.addEventListener("click", function () {
        itemEditContainer.style.display = "none";
        blur.style.display = "none";
      });
    }
  }

  const buttonControls = buttonLogic();
  const listControls = listLogic();

  buttonControls.newBtn();
  buttonControls.cancelBtn();
  listControls.displayItem();
}
