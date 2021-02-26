document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.querySelector("#todoList");
    const todoForm = document.querySelector("#noteForm");
    const todoTextarea = todoForm.querySelector('textarea');

    const clearButton = document.getElementById('clear');
    clearButton.addEventListener("click", () => {
        window.localStorage.clear();
        window.location.reload();
    })

    todoForm.addEventListener("submit", e => {
        e.preventDefault();

        if (todoTextarea.value !== "") {
            addTask(todoTextarea.value);
            todoTextarea.value = "";
            document.getElementById("note-title").value = "";
        }
    });


    loadNotes();

});


function loadNotes() {
    const todoList = document.querySelector("#todoList");
    todoList.innerHTML = "";

    for (var key in localStorage) {
        if (key) {
            const savedNote = JSON.parse(window.localStorage.getItem(key));
            if (savedNote) {
                addNote(key, savedNote.title, savedNote.note, savedNote.color);
            }
        }
    }

}

function addTask(text) {
    const noteTitle = document.getElementById("note-title").value;

    const date = new Date().getTime();


    const noteColor = document.getElementById("mySelect").value;

    addNote(date, noteTitle, text, noteColor);

    saveToStorage(noteTitle, text, date, noteColor);
}


function saveToStorage(noteTitle, text, date, noteColor) {
    const noteData = {
        title: noteTitle,
        note: text,
        color: noteColor,
    };

    window.localStorage.setItem(date, JSON.stringify(noteData));
}

function addNote(dateTime, title, text, color) {
    const element = document.createElement("div");
    if (todoList.children.length === 0) {
        element.classList.add("left-element");
    } else {
        element.classList.add("right-element");

    }


    const elementInner = document.querySelector("#elementTemplate").content.cloneNode(true);

    element.append(elementInner);

    element.querySelector('.element-title').innerText = title;

    const date = new Date();
    date.setTime(dateTime);

    const dateText = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()} godz.: ${date.getHours()}:${date.getMinutes()}`;
    element.querySelector(".element-date").innerText = dateText;

    element.querySelector(".element-text").innerText = text;

    todoList.append(element);


    if (color === "green") {
        element.querySelector(".element-bar").style.backgroundColor = "green";
    }
    if (color === "yellow") {
        element.querySelector(".element-bar").style.backgroundColor = "darkgoldenrod";
    }
    if (color === "red") {
        element.querySelector(".element-bar").style.backgroundColor = "red";
    }

    element.querySelector("#delete-button").addEventListener("click", function(event) {
        deleteNote(date.getTime());
    })
}

function parzyste(zakres) {
    for (let i = 0; i < zakres; i++) {
        if (i % 2 == 0) {
            console.log(i)
        }
    }
}

function deleteNote(id) {
    window.localStorage.removeItem(id);
    loadNotes();
}