let currentStage = 1;
const totalStages = 4;
const formData = {}; // Temporary storage for user input

const form = document.getElementById('workflow-form');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress-bar');

// 1. Navigation Logic
function updateStage(direction) {
    if (direction === 'next' && !validateStage()) return;

    // Save data from current stage
    captureData();

    // Update Stage Index
    currentStage += (direction === 'next' ? 1 : -1);
    
    if (currentStage === 4) renderReview();
    renderUI();
}

// 2. Validation Engine
function validateStage() {
    const activeStage = document.getElementById(`stage-${currentStage}`);
    const inputs = activeStage.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    // Special rule for Stage 2 (Radio selection)
    if (currentStage === 2) {
        const radioSelected = document.querySelector('input[name="freq"]:checked');
        if (!radioSelected) {
            alert("Please select a newsletter frequency.");
            isValid = false;
        }
    }

    return isValid;
}

// 3. Data Management
function captureData() {
    const activeStage = document.getElementById(`stage-${currentStage}`);
    const inputs = activeStage.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (input.checked) formData[input.name] = input.value;
        } else {
            formData[input.name] = input.value;
        }
    });
}

function renderReview() {
    const reviewDiv = document.getElementById('review-data');
    reviewDiv.innerHTML = `
        <p><strong>Name:</strong> ${formData.fullname}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Account:</strong> ${formData.accountType}</p>
    `;
}

// 4. UI Rendering
function renderUI() {
    // Show/Hide stages
    document.querySelectorAll('.stage').forEach((s, i) => {
        s.classList.toggle('active', i + 1 === currentStage);
    });

    // Progress Bar
    const progress = ((currentStage - 1) / (totalStages - 1)) * 100;
    progressBar.style.width = `${progress}%`;

    // Update Step Bubbles
    document.querySelectorAll('.step').forEach((s, i) => {
        s.classList.toggle('active', i + 1 <= currentStage);
    });

    // Button Visibility
    prevBtn.classList.toggle('hidden', currentStage === 1);
    nextBtn.classList.toggle('hidden', currentStage === totalStages);
    submitBtn.classList.toggle('hidden', currentStage !== totalStages);
}

// Event Listeners
nextBtn.addEventListener('click', () => updateStage('next'));
prevBtn.addEventListener('click', () => updateStage('prev'));

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStage()) {
        alert("Workflow Complete! Data logged to console.");
        console.log("Final Submission:", formData);
    }
});