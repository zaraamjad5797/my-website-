let cartItems = [];

function addToCart(button, productName, price) {
    cartItems.push({
        name: productName,
        price: Number(price)
    });

    document.getElementById("cart-count").textContent = cartItems.length;

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
        return;
    }

    let total = 0;

    const products = cartItems.map(item => {
        total += item.price;
        return "• " + item.name + " — Rs. " + item.price;
    }).join("<br>");

    message.innerHTML =
        "<strong>Your Products:</strong><br><br>" +
        products +
        "<br><br><strong>Total: Rs. " + total + "</strong>";
}

function closeCart() {
    document.getElementById("cart-panel").style.display = "none";
}

function clearCart() {
    cartItems = [];
    document.getElementById("cart-count").textContent = "0";
    document.getElementById("cart-message").innerHTML =
        "Your cart is empty.";
}

function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = cartItems
        .map(item => item.name + " — Rs. " + item.price)
        .join("\n");

    const total = cartItems.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    const message =
        "Hello! I want to order:\n\n" +
        order +
        "\n\nTotal: Rs. " + total;

    const whatsappNumber = "923224091127";

    window.open(
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message),
        "_blank"
    );
}
