// ===============================
// ART & CRAFT WEBSITE SCRIPT
// ===============================

let cart = JSON.parse(localStorage.getItem("artCraftCart")) || [];

// ===============================
// DARK MODE
// ===============================

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );
}


// ===============================
// CART FUNCTIONS
// ===============================

function saveCart() {
    localStorage.setItem(
        "artCraftCart",
        JSON.stringify(cart)
    );
}


function addToCart(button, productName, price) {

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

    const originalText = button.textContent;

    button.textContent = "Added ✓";

    setTimeout(() => {

        button.textContent = originalText;

    }, 1000);
}


function openCart() {

    const cartPanel =
        document.getElementById("cart-panel");

    if (cartPanel) {

        cartPanel.style.display = "block";

    }

    updateCart();
}


function closeCart() {

    const cartPanel =
        document.getElementById("cart-panel");

    if (cartPanel) {

        cartPanel.style.display = "none";

    }

}


function updateCart() {

    const message =
        document.getElementById("cart-message");

    if (!message) return;


    if (cart.length === 0) {

        message.innerHTML =
            "Your cart is empty 🛒";

        updateCartCount();

        return;
    }


    let total = 0;


    const products = cart.map(
        (item, index) => {

            total +=
                item.price * item.quantity;

            return `
                <div class="cart-item">

                    <strong>${item.name}</strong>

                    <p>
                        Rs. ${item.price}
                        ×
                        ${item.quantity}
                    </p>

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                    <button
                        onclick="removeItem(${index})"
                    >
                        🗑️ Remove
                    </button>

                </div>
            `;

        }

    ).join("<hr>");


    message.innerHTML =

        "<strong>Your Products:</strong><br><br>" +

        products +

        "<br><br>" +

        "<strong>Total: Rs. " +

        total +

        "</strong>";

}


function changeQuantity(index, change) {

    cart[index].quantity += change;


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


function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent =
            cart.reduce(

                (total, item) =>
                    total + item.quantity,

                0

            );

    }

}


// ===============================
// WHATSAPP CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    const order = cart.map(

        item =>

            item.name +

            " - Qty: " +

            item.quantity

    ).join("\n");


    const total = cart.reduce(

        (sum, item) =>

            sum +

            item.price *

            item.quantity,

        0

    );


    const message =

        "Hello! I want to place an order from Art & Craft.\n\n" +

        order +

        "\n\nTotal: Rs. " +

        total;


    const confirmOrder = confirm(

        "Your order total is Rs. " +

        total +

        ".\n\nContinue to WhatsApp?"

    );


    if (!confirmOrder) return;


    const whatsappNumber =
        "923224091127";


    const whatsappURL =

        "https://wa.me/" +

        whatsappNumber +

        "?text=" +

        encodeURIComponent(message);


    window.open(

        whatsappURL,

        "_blank"

    );

}


// ===============================
// CUSTOM ORDER WHATSAPP
// ===============================

function sendCustomOrder(event) {

    event.preventDefault();


    const name =

        document.getElementById(
            "customer-name"
        ).value;


    const product =

        document.getElementById(
            "custom-product"
        ).value;


    const request =

        document.getElementById(
            "custom-request"
        ).value;


    const message =

        "Hello! I want to place a Custom Order.\n\n" +

        "Name: " +

        name +

        "\n" +

        "Product Type: " +

        product +

        "\n" +

        "My Idea: " +

        request;


    const whatsappNumber =
        "923224091127";


    const whatsappURL =

        "https://wa.me/" +

        whatsappNumber +

        "?text=" +

        encodeURIComponent(message);


    window.open(

        whatsappURL,

        "_blank"

    );

}


// ===============================
// PRODUCT FILTER
// ===============================

function filterProducts(category) {

    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        const productCategory =
            product.dataset.category
                .toLowerCase();


        if (

            category === "all" ||

            productCategory.includes(
                category.toLowerCase()
            )

        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ===============================
// QUICK VIEW
// ===============================

function openQuickView(button) {

    const product =

        button.closest(
            ".product-card, .product"
        );


    if (!product) return;


    const imageElement =
        product.querySelector("img");


    const titleElement =
        product.querySelector("h3");


    const priceElement =
        product.querySelector(
            ".price, strong"
        );


    const descriptionElement =
        product.querySelector("p");


    const modal =
        document.getElementById(
            "quick-view-modal"
        );


    if (!modal) return;


    document.getElementById(
        "quick-view-image"
    ).src =

        imageElement
            ? imageElement.src
            : "";


    document.getElementById(
        "quick-view-title"
    ).textContent =

        titleElement
            ? titleElement.textContent
            : "";


    document.getElementById(
        "quick-view-price"
    ).textContent =

        priceElement
            ? priceElement.textContent
            : "";


    document.getElementById(
        "quick-view-description"
    ).textContent =

        descriptionElement
            ? descriptionElement.textContent
            : "A beautiful handmade creation.";


    modal.classList.add("show");

}


// Extra support for old buttons
function quickView(button) {

    openQuickView(button);

}


function closeQuickView() {

    const modal =
        document.getElementById(
            "quick-view-modal"
        );


    if (modal) {

        modal.classList.remove("show");

    }

}


// ===============================
// SCROLL REVEAL
// ===============================

function revealOnScroll() {

    const reveals =
        document.querySelectorAll(
            ".reveal"
        );


    reveals.forEach(element => {

        const windowHeight =
            window.innerHeight;


        const elementTop =
            element
                .getBoundingClientRect()
                .top;


        const revealPoint = 100;


        if (

            elementTop <

            windowHeight -

            revealPoint

        ) {

            element.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


window.addEventListener(
    "load",
    revealOnScroll
);


// ===============================
// INITIAL LOAD
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        updateCartCount();

        updateCart();

        revealOnScroll();

    }

);
