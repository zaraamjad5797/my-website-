let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function addToCart(button, productName, price) {
    price = Number(price) || 0;
saveCart();
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

    document.getElementById("cart-count").textContent =
        cartItems.reduce((total, item) => total + item.quantity, 0);

    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = "Add to Cart";
    }, 1000);
}

function openCart() {
    document.getElementById("cart-panel").style.display = "block";
    updateCart();
}

function updateCart() {
    const message = document.getElementById("cart-message");

    if (cartItems.length === 0) {
        message.innerHTML = "Your cart is empty.";
        return;
    }

    let total = 0;

    const products = cartItems.map((item, index) => {
        total += item.price * item.quantity;

        return `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                Rs. ${item.price} × ${item.quantity}
                <br>
                <button onclick="changeQuantity(${index}, -1)">➖</button>
<strong>${item.quantity}</strong>
<button onclick="changeQuantity(${index}, 1)">➕</button>

<button onclick="removeItem(${index})">🗑️ Remove</button>
function removeItem(index) {
    cartItems.splice(index, 1);

    document.getElementById("cart-count").textContent =
        cartItems.reduce((total, item) => total + item.quantity, 0);

    updateCart();
}
            </div>
        `;
    }).join("<hr>");

    message.innerHTML =
        "<strong>Your Products:</strong><br><br>" +
        products +
        "<br><strong>Total: Rs. " + total + "</strong>";
}

function changeQuantity(index, change) {
    cartItems[index].quantity += change;
saveCart();
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }

    document.getElementById("cart-count").textContent =
        cartItems.reduce((total, item) => total + item.quantity, 0);

    updateCart();
}

function closeCart() {
    document.getElementById("cart-panel").style.display = "none";
    saveCart();
}

function clearCart() {
    cartItems = [];
    document.getElementById("cart-count").textContent = "0";
    updateCart();
    saveCart();
}

function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = cartItems.map(item =>
        item.name +
        " — Qty: " + item.quantity +
        " — Rs. " + (item.price * item.quantity)
    ).join("\n");

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

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
document.getElementById("cart-count").textContent =
    cartItems.reduce((total, item) => total + item.quantity, 0);
if (cartItems.length > 0) {
    updateCart();
}
