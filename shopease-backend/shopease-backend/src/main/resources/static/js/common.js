document.addEventListener("DOMContentLoaded", function () {

    // Highlight the current page in the navigation
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a").forEach(function (link) {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.style.color = "#ff6600";
            link.style.fontWeight = "bold";
        }
    });

    // Display cart item count
    const cartCountElement = document.getElementById("cart-count");

    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem("shopeaseCart")) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = count;
    }

});