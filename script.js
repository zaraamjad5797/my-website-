let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addToCart(button, productName, price) {

    // Agar product name aur price directly nahi diye gaye
    if (!productName || price === undefined) {
        const card = button.closest(".product-card");

        productName = card.querySelector("h3").textContent;

        const priceText = card.querySelector("strong").textContent;
        price = Number(priceText.replace(/[^\d]/g, ""));
    }

    price = Number(price) || 0;

    const existingItem = cartItems.find(
        item => item.name === productName
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    saveCart();

    document.getElementById("cart-count").textContent =
        cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

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

    if (cartItems.length === 0) {
        message.innerHTML = "Your cart is empty 🛒";
        return;
    }

    let total = 0;

    const products = cartItems.map((item, index) => {

        total += item.price * item.quantity;

        return `
            <div class="cart-item">

                <strong>${item.name}</strong>

                <p>
                    Rs. ${item.price} × ${item.quantity}
                </p>

                <button onclick="changeQuantity(${index}, -1)">−</button>

                <strong>${item.quantity}</strong>

                <button onclick="changeQuantity(${index}, 1)">+</button>

                <button onclick="removeItem(${index})">
                    🗑️ Remove
                </button>

            </div>
        `;
    }).join("<hr>");

    message.innerHTML =
        "<strong>Your Products:</strong><br><br>" +
        products +
        "<br><br><strong>Total: Rs. " +
        total +
        "</strong>";
}

function changeQuantity(index, change) {

    cartItems[index].quantity += change;

    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }

    saveCart();

    document.getElementById("cart-count").textContent =
        cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

    updateCart();
}

function removeItem(index) {

    cartItems.splice(index, 1);

    saveCart();

    document.getElementById("cart-count").textContent =
        cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

    updateCart();
}

function clearCart() {

    cartItems = [];

    saveCart();

    document.getElementById("cart-count").textContent = "0";

    updateCart();
}

function checkout() {

    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = cartItems.map(item =>
        item.name +
        " - Qty: " +
        item.quantity +
        " - Rs. " +
        (item.price * item.quantity)
    ).join("\n");

    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const message =
        "Hello! I want to order:\n\n" +
        order +
        "\n\nTotal: Rs. " +
        total;

    const confirmOrder = confirm(
        "Your order total is Rs. " +
        total +
        ". Do you want to continue to WhatsApp?"
    );

    if (!confirmOrder) {
        return;
    }

    const whatsappNumber = "923224091127";

    window.open(
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}

document.addEventListener("DOMContentLoaded", () => {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

    updateCart();
});
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );
}

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}
function filterProducts(category) {
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        if (
            category === "all" ||
            product.dataset.category === category
        ) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}function revealOnScroll() {
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
function sendCustomOrder(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const product = document.getElementById("custom-product").value;
    const request = document.getElementById("custom-request").value;

    const message =
        "Hello! I want to place a Custom Order.%0A%0A" +
        "Name: " + name + "%0A" +
        "Product Type: " + product + "%0A" +
        "My Idea: " + request;

    const whatsappNumber = "923224091127";

    window.open(
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}
