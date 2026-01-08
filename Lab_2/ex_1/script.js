const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// --- 1. Rectangle (Top Left) ---
ctx.fillStyle = "#b9d004ff"; // Bright Pink
ctx.shadowBlur = 15;
ctx.shadowColor = "#befaa4ff";
ctx.fillRect(20, 20, 100, 60);

// Reset shadow for text
ctx.shadowBlur = 0;

// --- 2. 3D Text (Center) ---
const textX = canvas.width / 2;
const textY = 150;

ctx.font = "bold 45px Arial";
ctx.textAlign = "center";

// Shadow layers for 3D effect
ctx.fillStyle = "#000000";
ctx.fillText("HTML5 Canvas", textX + 4, textY + 4);
ctx.fillStyle = "#444444";
ctx.fillText("HTML5 Canvas", textX + 2, textY + 2);
ctx.fillStyle = "#3c06fdff"; // Bright Cyan
ctx.fillText("HTML5 Canvas", textX, textY);

// --- 3. Straight Line (Underline) ---
ctx.beginPath();
ctx.moveTo(80, 175); // Start position
ctx.lineTo(420, 175); // End position
ctx.lineWidth = 6;
ctx.strokeStyle = "#070707ff";
ctx.lineCap = "round";
ctx.stroke();

// --- 4. Circle (Bottom Right Corner) ---
const radius = 40;
const centerX = canvas.width - 60; // 440
const centerY = canvas.height - 60; // 240

ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.fillStyle = "#d55c05ff"; // Neon Green
ctx.shadowBlur = 25;
ctx.shadowColor = "#e7f795ff";
ctx.fill();