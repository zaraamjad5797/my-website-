let cartCount = 0;

function addToCart(button) {
    cartCount++;

    const count = document.getElementById("cart-count");
    if (count) {
        count.textContent = cartCount;
    }

    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = "Add to Cart";
    }, 1000);
}
