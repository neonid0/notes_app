const newnote_btn = document.getElementById("newnote_btn");
const newcontainer_btn = document.getElementById("newcontainer_btn");
const newcontainer = document.querySelector(".newcontainer");
const newcontainer_sep = document.getElementById("newcontainer_sep")
const container_delete = document.getElementById("container_delete");

let containerCounter = 0;
let noteCounter = 0;

// Function to create a new note
function createNewNote(parentContainer) {
    noteCounter++;
    const newNoteElement = document.createElement("div");
    newNoteElement.className = "note";
    newNoteElement.id = `note_${noteCounter}`;

    // Adding note content
    newNoteElement.innerHTML = `
        <input type="text" name="note_label" id="note_label_${noteCounter}" placeholder="Label" readonly>
        <button id="edit_note_${noteCounter}" name="edit_note" onclick="toggleEdit('${noteCounter}')"><span id="container_delete_span_${noteCounter}" name="edit_note_span_${noteCounter}"></span></button>
        <button id="note_delete_${noteCounter}" onclick="deleteNote('${newNoteElement.id}')" name="note_delete"><span id="container_delete_span_${noteCounter}" name="note_delete_span"></span></button>
        <textarea name="notearea" id="notearea_${noteCounter}" placeholder="Write something.." readonly></textarea>
    `;
    const newNoteButton = parentContainer.querySelector('.newnote button');

    parentContainer.insertBefore(newNoteElement, newNoteButton.parentNode);
}

// Function to create a new container
function createNewContainer() {
    containerCounter++;
    if (containerCounter === 1) {
        newcontainer_sep.style.display = "none"
    }
    const newContainer = document.createElement("div");
    newContainer.className = "container";
    newContainer.id = `container_${containerCounter}`;
    newContainer.style.display = "flex"; // Ensure it is visible

    // Adding content to the new container
    newContainer.innerHTML = `
        <span name="area"></span>
        <input id="container_label_${containerCounter}" placeholder="Note">
        <button id="container_delete_${containerCounter}" onclick="deleteContainer('${newContainer.id}')" name="container_delete")"><span id="container_delete_span_${containerCounter}" name="container_delete_span"></span></button>
        <div class="newnote">
            <button id="newnote_btn_${containerCounter}" onclick="createNewNote(document.getElementById('${newContainer.id}'))">+</button>
        </div>
    `;

    // Append the new container to the main card
    const card = document.querySelector(".card");
    card.appendChild(newContainer);

    const note_delete_btn = document.getElementById(`note_delete_${noteCounter}`);
}

// Function to delete a container
function deleteContainer(containerId) {
    let container = document.getElementById(`${containerId}`);
    container.remove();
    containerCounter = containerCounter - 1
    if (containerCounter === 0) {
        newcontainer_sep.style.display = "flex"
    }
}

function deleteNote(noteId) {
    let note = document.getElementById(`${noteId}`);
    note.remove();
}

function toggleEdit(noteId) {
    const inputField = document.getElementById(`note_label_${noteId}`);
    const textareaField = document.getElementById(`notearea_${noteId}`);
    const edit_button_span = document.getElementById(`edit_note_span_${noteId}`);

    if (inputField.readOnly) {
        // Enable editing
        inputField.readOnly = false;
        textareaField.readOnly = false;
        inputField.classList.add("editable");
        textareaField.classList.add("editable");
        inputField.style.cursor = "auto"
        textareaField.style.cursor = "auto"
        inputField.style.color = "snow"
        textareaField.style.color = "snow"
        inputField.style.borderColor = "snow"
        inputField.style.textShadow = "4px 3px 10px #000"
        textareaField.style.textShadow = "4px 3px 10px #000"

    } else {
        // Disable editing
        inputField.readOnly = true;
        textareaField.readOnly = true;
        inputField.classList.remove("editable");
        textareaField.classList.remove("editable");
        inputField.style.cursor = "no-drop"
        textareaField.style.cursor = "no-drop"
        inputField.style.color = "#fffafa69"
        textareaField.style.color = "#fffafa69"
        inputField.style.borderColor = "#fdfdfd30"
        inputField.style.textShadow = "none"
        textareaField.style.textShadow = "none"

    }
}

newcontainer_btn.addEventListener("click", createNewContainer);


