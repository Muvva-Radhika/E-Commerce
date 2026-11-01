document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {

    const productContainer = document.getElementById("product-list");

    if (!productContainer) return;

    try {

        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        const products = await response.json();

        productContainer.replaceChildren();

        if (products.length === 0) {
            productContainer.textContent = "No products available.";
            return;
        }

        products.forEach(function (product) {

            const card = document.createElement("div");
            card.className = "product-card";

            const image = document.createElement("img");
            image.src = product.imageUrl || "/images/product-placeholder.svg";
            image.alt = product.name;
            image.onerror = function () {
                image.src = "/images/product-placeholder.svg";
            };

            const name = document.createElement("h2");
            name.textContent = product.name;

            const description = document.createElement("p");
            description.textContent = product.description || "";

            const price = document.createElement("p");
            price.className = "price";
            price.textContent = "₹" + Number(product.price).toLocaleString("en-IN");

            const stock = document.createElement("p");
            stock.textContent = "Available stock: " + product.stock;

            const addButton = document.createElement("button");
            addButton.textContent = "Add to Cart";
            addButton.className = "cart";
            addButton.disabled = product.stock <= 0;

            addButton.addEventListener("click", function () {
                addToCart(product);
            });

            card.append(
                image,
                name,
                description,
                price,
                stock,
                addButton
            );

            productContainer.appendChild(card);

        });

    } catch (error) {

        console.error(error);
        productContainer.textContent =
            "Unable to load products. Please check the backend server.";

    }
}


// Add product to browser cart
function addToCart(product) {

    const cart = JSON.parse(localStorage.getItem("shopeaseCart")) || [];

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {

        if (existingProduct.quantity >= product.stock) {
            alert("Maximum available stock reached.");
            return;
        }

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        });

    }

    localStorage.setItem("shopeaseCart", JSON.stringify(cart));

    alert(product.name + " added to cart!");

}