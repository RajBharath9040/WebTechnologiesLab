function createNewTask() {
    const input = document.getElementById('taskName');
    if (!input.value) return;

    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = 't-' + Date.now(); // Unique ID using timestamp
    
    // Add content
    const date = new Date().toLocaleDateString();
    card.innerHTML = `
        <div style="font-weight:bold">${input.value}</div>
        <div style="font-size:0.8em; opacity:0.6">${date}</div>
    `;

    // Drag events
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        card.style.opacity = '0.5';
    });

    card.addEventListener('dragend', () => {
        card.style.opacity = '1';
    });

    document.querySelector('#todo .content').appendChild(card);
    input.value = '';
}

function onDragOver(e) {
    e.preventDefault(); // Allow drop
}

function onDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    
    // Find the lane content area
    let dropzone = e.target;
    while (!dropzone.classList.contains('lane')) {
        dropzone = dropzone.parentElement;
    }
    
    const contentArea = dropzone.querySelector('.content');
    contentArea.appendChild(draggableElement);

    // If dropped in Completed
    if (dropzone.id === 'completed') {
        if (!draggableElement.classList.contains('finished')) {
            draggableElement.classList.add('finished');
            // Timeout allows the card to land before the alert pops up
            setTimeout(() => {
                alert("🎉 Task Completed Successfully!");
            }, 100);
        }
    } else {
        draggableElement.classList.remove('finished');
    }
}