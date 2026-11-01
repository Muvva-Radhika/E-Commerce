document.addEventListener("DOMContentLoaded", displayCart);

function getCart() {
    return JSON.parse(localStorage.getItem("shopeaseCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("shopeaseCart", JSON.stringify(cart));
}

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    if (!cartItems) return;

    const cart = getCart();
    cartItems.replaceChildren();

    let subtotal = 0;

    if (cart.length === 0) {
        cartItems.textContent = "Your shopping cart is empty.";
    }

    cart.forEach(function (item) {

        subtotal += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.imageUrl || "/images/product-placeholder.svg";
        image.alt = item.name;
        image.onerror = function () {
            image.src = "/images/product-placeholder.svg";
        };

        const details = document.createElement("div");
        details.className = "product-details";

        const name = document.createElement("h2");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "₹" + item.price;

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.addEventListener("click", () => changeQuantity(item.id, 1));

        const decrease = document.createElement("button");
        decrease.textContent = "−";
        decrease.addEventListener("click", () => changeQuantity(item.id, -1));

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.className = "remove";
        remove.addEventListener("click", () => removeProduct(item.id));

        details.append(name, price, quantity, decrease, increase);
        row.append(image, details, remove);

        cartItems.appendChild(row);

    });

    const delivery = cart.length > 0 ? 50 : 0;
    const total = subtotal + delivery;

    document.getElementById("subtotal").textContent = "₹" + subtotal.toFixed(2);
    document.getElementById("delivery").textContent = "₹" + delivery.toFixed(2);
    document.getElementById("total").textContent = "₹" + total.toFixed(2);

}

function changeQuantity(id, amount) {

    const cart = getCart();

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        saveCart(cart.filter(product => product.id !== id));
    } else {
        saveCart(cart);
    }

    displayCart();

}

function removeProduct(id) {

    const cart = getCart().filter(item => item.id !== id);

    saveCart(cart);
    displayCart();

}

function checkout() {

    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Your cart is ready. Checkout functionality needs to be connected to the backend.");

}