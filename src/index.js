import './styles.css'; 

let myList = []

function listItem(title, description, dueDate, priority) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
}

function listLogic() {
    let listDisplay = document.getElementById("listDisplay");

    function displayItem() {
        listDisplay.innerHTML = '';
    
        myList.forEach(function(item, index) {
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
                myList.splice(index, 1);
                displayItem();
            });
    
            listDisplay.appendChild(itemContainer);
        });
    }

    function setupFormListener() {
        document.getElementById("formElement").addEventListener("submit", (e) => {
            e.preventDefault();
            let title = document.getElementById("title").value;
            let desc = document.getElementById("desc").value;
            let priority = document.getElementById("priority").value;
            let dueDate = document.getElementById("dueDate").value;
        
            const newListItem = new listItem(title, desc, dueDate, priority);
            myList.push(newListItem);
            console.log(myList);
        
            displayItem();
        
            document.getElementById('formElement').style.display = 'none';
        });
    }

    setupFormListener();

    return {
        displayItem
    }
}

function buttonLogic() {

    function newBtn() {
        const newButton = document.getElementById("newBtn")

        newButton.addEventListener('click', function() {
            document.getElementById('formElement').style.display = 'block';
        });
    }

    function cancelBtn() {
        const cancelButton = document.getElementById('cancelBtn');
        cancelButton.addEventListener('click', function() {
            document.getElementById('formElement').style.display = 'none';
        });
    }

    return {
        newBtn,
        cancelBtn
    }
}

const buttonControls = buttonLogic()
const listControls = listLogic()

buttonControls.newBtn()
buttonControls.cancelBtn()

listControls.displayItem()