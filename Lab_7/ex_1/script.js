const API_URL = "http://localhost:3000/notes";

// Initial Load
document.addEventListener('DOMContentLoaded', fetchNotes);

// 1. Add Note (AJAX POST)
async function addNote() {
    const data = {
        title: document.getElementById('title').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    clearInputs();
    fetchNotes();
}

// 2. View Notes (AJAX GET)
async function fetchNotes() {
    const res = await fetch(API_URL);
    const notes = await res.json();
    const list = document.getElementById('notesList');
    
    list.innerHTML = notes.map(note => `
        <div class="note-card">
            <span class="subject-tag">${note.subject}</span>
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <small>Created: ${note.created_date}</small><br><br>
            <button class="btn-edit" onclick="updateNote('${note._id}')">Update</button>
            <button class="btn-delete" onclick="deleteNote('${note._id}')">Delete</button>
        </div>
    `).join('');
}

// 3. Update Note (AJAX PUT)
async function updateNote(id) {
    const newTitle = prompt("Update Title:");
    const newDesc = prompt("Update Description:");

    if (newTitle && newDesc) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, description: newDesc })
        });
        fetchNotes();
    }
}

// 4. Delete Note (AJAX DELETE)
async function deleteNote(id) {
    if (confirm("Are you sure you want to delete this note?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchNotes();
    }
}

function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('description').value = '';
}