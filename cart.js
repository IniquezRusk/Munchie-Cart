console.log("cart.js is loaded");
console.log("raw cart:", localStorage.getItem("cart"));

function loadCart() {
    const cartDiv = document.getElementById("cartItems");
    const totalPriceEl = document.getElementById("totalPrice");

    if (!cartDiv || !totalPriceEl) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartDiv.innerHTML = `<p class="empty-cart-message">Your cart is empty.</p>`;
        totalPriceEl.innerText = "0.00";
        return;
    }

    cart.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        total += itemTotal;

        let customizationsHTML = "";

        if (item.customizations && item.customizations.length > 0) {
            customizationsHTML = `
                <ul class="cart-customizations">
                    ${item.customizations.map(c => `<li>${c}</li>`).join("")}
                </ul>
            `;
        }

        const card = document.createElement("div");
        card.classList.add("cart-card");

        card.innerHTML = `
            <div class="cart-card-left">
                <h3>${item.name}</h3>
                <p class="cart-price">$${item.price.toFixed(2)} each</p>
                ${customizationsHTML}
            </div>

            <div class="cart-card-right">
                <div class="cart-quantity-controls">
                    <button onclick="decreaseQuantity(${index})">−</button>
                    <span>${quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>

                <p class="cart-item-total">$${itemTotal.toFixed(2)}</p>
                <button class="remove-btn-cart" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartDiv.appendChild(card);
    });

    totalPriceEl.innerText = total.toFixed(2);
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart[index]) return;

    cart[index].quantity = (cart[index].quantity || 1) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart[index]) return;

    const currentQty = cart[index].quantity || 1;

    if (currentQty > 1) {
        cart[index].quantity = currentQty - 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function submitOrder(event) {
    event.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // clear cart
    localStorage.removeItem("cart");
    loadCart();

    // show success screen
    const overlay = document.getElementById("order-success");
    overlay.classList.add("show");
}

function goHome() {
    window.location.href = "index.html";
}

loadCart();