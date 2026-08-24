let cartCount = 0;

function addToCart(button) {
    cartCount++;

    document.getElementById("cart-count").textContent = cartCount;

    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = "Add to Cart";
    }, 1000);
}
