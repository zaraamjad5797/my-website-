let cartCount = 0;

function addToCart(button) {
    cartCount++;

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

    if (cartCount === 0) {
        message.textContent = "Your cart is empty.";
    } else {
        message.textContent = cartCount + " product(s) added to your cart.";
    }
}

function closeCart() {
    document.getElementById("cart-panel").style.display = "none";
}
