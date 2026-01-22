let activityLog = [];
let clickCount = 0;
let clickTimer;

const logContainer = document.getElementById('log-container');
const warningBox = document.getElementById('warning-box');

// 1. Core Logging Function
function logActivity(type, target, details = "") {
    const entry = {
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        element: target,
        details: details
    };
    
    activityLog.push(entry);
    updateUI(entry);
    checkSuspiciousActivity(type);
}

// 2. Real-Time UI Update
function updateUI(entry) {
    const logItem = document.createElement('div');
    logItem.className = `log-item ${entry.type.toLowerCase()}`;
    logItem.innerHTML = `
        <span class="time">[${entry.timestamp}]</span>
        <strong>${entry.type.toUpperCase()}</strong>: 
        <em>${entry.element}</em> ${entry.details}
    `;
    logContainer.prepend(logItem); // Newest at top
}

// 3. Event Listeners (Delegation & Bubbling/Capturing)

// Capture Clicks (Bubbling phase)
document.addEventListener('click', (e) => {
    const targetDesc = `${e.target.tagName}${e.target.id ? '#' + e.target.id : ''}`;
    logActivity('click', targetDesc, `at X:${e.clientX}, Y:${e.clientY}`);
});

// Capture Keypresses
document.addEventListener('keydown', (e) => {
    logActivity('keypress', 'Document', `Key: "${e.key}"`);
});

// Capture Focus/Blur (Using Capture Phase because focus doesn't bubble)
document.addEventListener('focus', (e) => {
    logActivity('focus', e.target.tagName, "Element focused");
}, true); // 'true' enables Capturing

// 4. Threshold & Security Logic
function checkSuspiciousActivity(type) {
    if (type === 'click') {
        clickCount++;
        
        // Reset count if no clicks for 2 seconds
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

        // Warning threshold: 10 clicks in 2 seconds
        if (clickCount > 10) {
            warningBox.classList.remove('hidden');
            setTimeout(() => warningBox.classList.add('hidden'), 3000);
        }
    }
}

// 5. Export & Reset
document.getElementById('export-btn').onclick = () => {
    const formattedText = activityLog
        .map(l => `${l.timestamp} | ${l.type} | ${l.element} | ${l.details}`)
        .join('\n');
    
    const blob = new Blob([formattedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity_log.txt';
    a.click();
};

document.getElementById('reset-btn').onclick = () => {
    activityLog = [];
    logContainer.innerHTML = '';
    clickCount = 0;
};