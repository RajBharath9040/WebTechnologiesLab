// 1. Initial State
let products = [
    { id: 1, name: "Laptop", price: 1000, category: "Electronics" },
    { id: 2, name: "Headphones", price: 150, category: "Electronics" },
    { id: 3, name: "Notebook", price: 10, category: "Stationery" }
];

let cart = [];
let activeCouponDiscount = 0;

// 2. Core Discount Engine
function calculateTotals() {
    let subtotal = 0;
    let savings = 0;
    const currentHour = new Date().getHours();

    cart.forEach(item => {
        let lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        // Rule: Bulk Discount (15% off if buying 5+ of same item)
        if (item.quantity >= 5) {
            savings += lineTotal * 0.15;
        }

        // Rule: Category Discount (10% off Electronics)
        if (item.category === "Electronics") {
            savings += lineTotal * 0.10;
        }
    });

    // Rule: Happy Hour (Extra 5% off everything between 2PM and 5PM)
    if (currentHour >= 14 && currentHour <= 17) {
        savings += (subtotal - savings) * 0.05;
    }

    // Apply Coupon Logic
    let couponSavings = (subtotal - savings) * activeCouponDiscount;
    let finalTotal = subtotal - savings - couponSavings;

    return { subtotal, savings: savings + couponSavings, finalTotal };
}

// 3. Cart Actions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    render();
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    render();
}

function applyCoupon() {
    const inputField = document.getElementById('coupon-input');
    const code = inputField.value.trim().toUpperCase();

    // Strategy: List of valid codes
    const discountLibrary = {
        "SAVE10": 0.10,
        "BIGDEAL": 0.25,
        "WELCOME": 0.05
    };

    if (discountLibrary[code]) {
        activeCouponDiscount = discountLibrary[code];
        alert(`Success! ${activeCouponDiscount * 100}% off applied.`);
    } else if (code === "") {
        activeCouponDiscount = 0;
    } else {
        alert("This coupon does not exist.");
        activeCouponDiscount = 0;
    }
    
    saveCart();
    render();
}

// 4. UI Rendering
function render() {
    // Render Products
    const prodList = document.getElementById('product-list');
    prodList.innerHTML = products.map(p => `
        <div class="card">
            <span>${p.name} - $${p.price}</span>
            <button onclick="addToCart(${p.id})">Add</button>
        </div>
    `).join('');
// NEW: Save to LocalStorage
function saveCart() {
    localStorage.setItem('my_intelligent_cart', JSON.stringify(cart));
}

// NEW: Load from LocalStorage (Run this when page loads)
function loadCart() {
    const saved = localStorage.getItem('my_intelligent_cart');
    if (saved) {
        cart = JSON.parse(saved);
        render();
    }
}

// NEW: Remove All items
function clearCart() {
    if(confirm("Are you sure you want to empty your cart?")) {
        cart = [];
        activeCouponDiscount = 0;
        saveCart();
        render();
    }
}

// Note: Remember to call saveCart() inside your existing 
// addToCart, updateQuantity, and applyCoupon functions.
    // Render Cart
    const cartDiv = document.getElementById('cart-items');
    cartDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} (x${item.quantity})</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
        </div>
    `).join('');

    // Render Summary
    const totals = calculateTotals();
    document.getElementById('summary').innerHTML = `
        <p>Subtotal: $${totals.subtotal.toFixed(2)}</p>
        <p style="color: green">Total Savings: -$${totals.savings.toFixed(2)}</p>
        <h3>Final Total: $${totals.finalTotal.toFixed(2)}</h3>
    `;
}

// Initial Run
render();