let cartCount = 0;
let cartItems = [];

function addToCart(button, productName) {
    cartCount++;
    cartItems.push(productName);

    document.getElementById("cart-count").textContent = cartCount;

    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = "Add to Cart";
    }, 1000);
}

function openCart() {
    const panel = document.getElementById("cart-panel");
    const message = document.getElementById("cart-message");

    panel.style.display = "block";

    if (cartItems.length === 0) {
        message.innerHTML = "Your cart is empty.";
    } else {
        message.innerHTML =
            "<strong>Your Products:</strong><br><br>" +
            cartItems.map(item => "• " + item).join("<br>");
    }
}

function closeCart() {
    document.getElementById("cart-panel").style.display = "none";
}function clearCart() {
    cartCount = 0;
    cartItems = [];

    document.getElementById("cart-count").textContent = 0;
    document.getElementById("cart-message").textContent = "Your cart is empty.";
}
function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = cartItems.join(", ");
    const message = "Hello! I want to order: " + order;

    const whatsappNumber = "923224091127";

    window.open(
        "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message),
        "_blank"
    );
}
