// =========================================================================
// 1. GLOBAL STATE & LOCAL STORAGE INITIALIZATION
// =========================================================================
// Pure code mein 'cart' variable name use hoga taake crash na ho
let cart = JSON.parse(localStorage.getItem("artCraftCart")) || [];

// Page load hote hi dark mode check karna taake white screen ka flash na aaye
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

function saveCart() {
    localStorage.setItem("artCraftCart", JSON.stringify(cart));
}

// =========================================================================
// 2. CORE SHOPPING CART ACTIONS (ADD, UPDATE, REMOVE)
// =========================================================================
function addToCart(button, productName, price) {
    // Agar product name aur price directly nahi diye gaye to HTML card se nikalen
    if (!productName || price === undefined) {
        const card = button.closest(".product-card");
        productName = card.querySelector("h3").textContent;
        const priceText = card.querySelector("strong").textContent;
        price = Number(priceText.replace(/[^\d]/g, ""));
    }

    price = Number(price) || 0;

    const existingItem = cart.find(
        item => item.name === productName
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    // Button par temporary "Added" ka checkmark dikhane k liye
    button.textContent = "Added ✓";
    setTimeout(() => {
        button.textContent = "Add to Cart";
    }, 1000);
}

function openCart() {
    document.getElementById("cart-panel").style.display = "block";
    updateCart();
}

function closeCart() {
    document.getElementById("cart-panel").style.display = "none";
}

function updateCart() {
    const message = document.getElementById("cart-message");

    if (cart.length === 0) {
        message.innerHTML = "Your cart is empty 🛒";
        updateCartCount();
        return;
    }

    let total = 0;

    const products = cart.map((item, index) => {
        total += item.price * item.quantity;

        return `
            <div class="cart-item">
                <strong>${item.name}</strong>
                <p>Rs. ${item.price} × ${item.quantity}</p>
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <strong>${item.quantity}</strong>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">🗑️ Remove</button>
            </div>
        `;
    }).join("<hr>");

    // Aapka string concatenation layout completely built aur complete hai
    message.innerHTML = 
        "<strong>Your Products:</strong><br><br>" +
        products +
        "<br><br><strong>Total: Rs. " +
        total +
        "</strong>";
}

function changeQuantity(index, change) {
    cart[index].quantity += change;

    // Quantity 0 ya us se kam ho to delete ho jaye
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartCount();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    updateCart();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    updateCart();
}

// =========================================================================
// 3. WHATSAPP CHECKOUT & CUSTOM ORDER SYSTEMS
// =========================================================================
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = cart.map(item =>
        item.name + " - Qty: " + item.quantity + " - Rs. " + (item.price * item.quantity)
    ).join("\n");

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = "Hello! I want to order:\n\n" + order + "\n\nTotal: Rs. " + total;

    const confirmOrder = confirm("Your order total is Rs. " + total + ". Do you want to continue to WhatsApp?");
    if (!confirmOrder) return;

    const whatsappNumber = "923224091127";
    window.open("https://wa.me" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank");
}

function sendCustomOrder(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const product = document.getElementById("custom-product").value;
    const request = document.getElementById("custom-request").value;

    // Line breaks k liye plain \n lagaya hai jo encodeURIComponent khud safe kar dega
    const message = 
        "Hello! I want to place a Custom Order.\n\n" +
        "Name: " + name + "\n" +
        "Product Type: " + product + "\n" +
        "My Idea: " + request;

    const whatsappNumber = "923224091127";
    window.open("https://wa.me" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank");
}

// =========================================================================
// 4. UI INTERACTIVE FEATURES (DARK MODE, FILTER, SCROLL REVEAL)
// =========================================================================
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function filterProducts(category) {
    const products = document.querySelectorAll(".product-card");
    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}

function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =========================================================================
// 5. QUICK VIEW MODAL CONTROLS
// =========================================================================
function openQuickView(button) {
    const product = button.closest(".product, .product-card");
    const image = product.querySelector("img").src;
    const title = product.querySelector("h3").textContent;

    // Card me se Rs. waali field dhoondne k liye paragraph ya strong tag check karein
    const priceElement = Array.from(product.querySelectorAll("p, strong"))
        .find(p => p.textContent.includes("Rs."));
    const price = priceElement ? priceElement.textContent : "";

    document.getElementById("quick-view-image").src = image;
    document.getElementById("quick-view-title").textContent = title;
    document.getElementById("quick-view-price").textContent = price;

    document
        .getElementById("quick-view-modal")
        .classList.add("show");
}

function closeQuickView() {
    document
        .getElementById("quick-view-modal")
        .classList.remove("show");
}

// =========================================================================
// 6. INITIAL RUNTIME & LIFECYCLE HOOKS
// =========================================================================
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateCart();
});

window.addEventListener("load", () => {
    updateCart();
});

