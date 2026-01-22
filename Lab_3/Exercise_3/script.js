const surveyData = [
    {
        id: "name",
        type: "text",
        label: "What is your full name?",
        required: true,
        placeholder: "e.g. John Doe",
        limit: 30
    },
    {
        id: "satisfaction",
        type: "radio",
        label: "How would you rate our service?",
        options: ["Excellent", "Good", "Fair", "Poor"],
        required: true
    },
    {
        id: "features",
        type: "checkbox",
        label: "Which features do you value most? (Select at least 2)",
        options: ["Speed", "Ease of Use", "Customer Support", "Affordability"],
        minSelection: 2
    },
    {
        id: "comments",
        type: "text",
        label: "Any additional feedback?",
        required: false,
        placeholder: "Optional...",
        limit: 100
    }
];

const form = document.getElementById('survey-form');
const questionsContainer = document.getElementById('survey-questions');

// 1. Render the form dynamically
function renderSurvey() {
    questionsContainer.innerHTML = surveyData.map(q => {
        let inputHtml = '';

        if (q.type === 'text') {
            inputHtml = `<input type="text" name="${q.id}" id="${q.id}" placeholder="${q.placeholder}" oninput="updateProgress()">`;
        } else {
            inputHtml = q.options.map(opt => `
                <div class="option-item">
                    <input type="${q.type}" name="${q.id}" value="${opt}" id="${q.id}_${opt}" onchange="updateProgress()">
                    <label for="${q.id}_${opt}">${opt}</label>
                </div>
            `).join('');
        }

        return `
            <div class="question-block" id="block-${q.id}">
                <label class="main-label">${q.label} ${q.required ? '<span class="req">*</span>' : ''}</label>
                <div class="input-wrapper">${inputHtml}</div>
                <div class="error-message" id="error-${q.id}"></div>
            </div>
        `;
    }).join('');
}

// 2. Comprehensive Validation logic
function validateForm() {
    const formData = new FormData(form);
    let isValid = true;

    surveyData.forEach(q => {
        const errorDiv = document.getElementById(`error-${q.id}`);
        const questionBlock = document.getElementById(`block-${q.id}`);
        let errorMessage = "";

        const value = formData.get(q.id);
        const allValues = formData.getAll(q.id);

        // Required check
        if (q.required && (!value || value.toString().trim() === "")) {
            errorMessage = "This question is mandatory.";
        } 
        // Character limit check
        else if (q.type === 'text' && q.limit && value.length > q.limit) {
            errorMessage = `Too long! Max ${q.limit} characters.`;
        }
        // Selection count check
        else if (q.type === 'checkbox' && q.minSelection && allValues.length < q.minSelection) {
            errorMessage = `Please select at least ${q.minSelection} options.`;
        }

        if (errorMessage) {
            errorDiv.innerText = errorMessage;
            questionBlock.classList.add('has-error');
            isValid = false;
        } else {
            errorDiv.innerText = "";
            questionBlock.classList.remove('has-error');
        }
    });

    return isValid;
}

// 3. Progress Bar Logic
function updateProgress() {
    const formData = new FormData(form);
    let completed = 0;

    surveyData.forEach(q => {
        const value = formData.get(q.id);
        const allValues = formData.getAll(q.id);
        
        if (q.type === 'checkbox') {
            if (allValues.length >= (q.minSelection || 1)) completed++;
        } else if (value && value.trim() !== "") {
            completed++;
        }
    });

    const percent = Math.round((completed / surveyData.length) * 100);
    document.getElementById('progress-bar').style.width = percent + "%";
    document.getElementById('progress-text').innerText = percent + "% Complete";
}

// 4. Submit Handling
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert("Success! Thank you for your feedback.");
        console.log("Form Data Submitted:", Object.fromEntries(new FormData(form).entries()));
        form.reset();
        updateProgress();
    }
});

renderSurvey();