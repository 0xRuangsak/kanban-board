let cardIdCounter = 0;

// Add a new card to the To Do column
function addCard() {
    const input = document.getElementById('cardInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a task description');
        return;
    }
    
    const todoColumn = document.querySelector('[data-column="todo"]');
    const card = createCard(text);
    todoColumn.appendChild(card);
    
    input.value = '';
    input.focus();
}

// Create a card element
function createCard(text) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = 'card-' + (++cardIdCounter);
    
    card.innerHTML = `
        <span class="card-text">${text}</span>
        <button class="delete-btn" onclick="deleteCard('${card.id}')">×</button>
    `;
    
    // Add drag event listeners
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    return card;
}

// Delete a card
function deleteCard(cardId) {
    const card = document.getElementById(cardId);
    if (card && confirm('Are you sure you want to delete this card?')) {
        card.remove();
    }
}

// Handle drag start
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
}

// Handle drag end
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

// Add event listeners to all card containers
document.addEventListener('DOMContentLoaded', function() {
    const cardContainers = document.querySelectorAll('.cards');
    
    cardContainers.forEach(container => {
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
        container.addEventListener('dragenter', handleDragEnter);
        container.addEventListener('dragleave', handleDragLeave);
    });
    
    // Allow adding cards with Enter key
    document.getElementById('cardInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCard();
        }
    });
});

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
}

// Handle drag enter
function handleDragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

// Handle drag leave
function handleDragLeave(e) {
    if (!e.target.contains(e.relatedTarget)) {
        e.target.classList.remove('drag-over');
    }
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    
    if (card && e.target.classList.contains('cards')) {
        e.target.appendChild(card);
    }
}