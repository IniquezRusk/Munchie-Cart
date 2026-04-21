const pass = prompt("Enter admin password:");

if (pass !== "munchie123") {
    document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:100px;'>Access Denied</h1>";
    throw new Error("Unauthorized");
}

function loadOrders() {
    fetch("../server/get_orders.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("orders-container");

            if (!data.success) {
                container.innerHTML = "<p>Failed to load orders.</p>";
                return;
            }

            if (data.orders.length === 0) {
                container.innerHTML = "<p>No orders found.</p>";
                return;
            }

            container.innerHTML = "";

            data.orders.forEach(order => {
                const orderCard = document.createElement("div");
                orderCard.classList.add("admin-order-card");

                const status = order.status || "Pending";

                let itemsHTML = "";

                order.items.forEach(item => {
                    let customizationHTML = "";

                    if (item.customizations && item.customizations !== "[]") {
                        let parsed = [];

                        try {
                            parsed = JSON.parse(item.customizations);
                        } catch {
                            parsed = [];
                        }

                        if (parsed.length > 0) {
                            customizationHTML = `
                                <div class="admin-customizations">
                                    ${parsed.map(c => `<span class="custom-pill">${c}</span>`).join("")}
                                </div>
                            `;
                        }
                    }

                    itemsHTML += `
                        <div class="admin-item-row">
                            <div class="admin-item-main">
                                <h4>${item.meal_name}</h4>
                                <p>Qty: ${item.quantity}</p>
                            </div>
                            <div class="admin-item-price">$${parseFloat(item.price).toFixed(2)}</div>
                            ${customizationHTML}
                        </div>
                    `;
                });

                orderCard.innerHTML = `
                    <div class="admin-order-top">
                        <div>
                            <h3>Order #${order.id}</h3>
                            <p class="admin-order-date">${order.order_date}</p>
                        </div>
                        <div class="admin-total-badge">Total: $${parseFloat(order.total_price).toFixed(2)}</div>
                    </div>

                    <div class="admin-status-row">
                        <span class="status-pill status-${status.toLowerCase()}">${status}</span>
                    </div>

                    <div class="admin-customer-info">
                        <p><strong>Name:</strong> ${order.first_name} ${order.last_name}</p>
                        <p><strong>Email:</strong> ${order.email}</p>
                        <p><strong>Phone:</strong> ${order.phone}</p>
                        <p><strong>Address:</strong> ${order.address_line1}${order.address_line2 ? ", " + order.address_line2 : ""}</p>
                    </div>

                    <div class="admin-items-block">
                        <h4 class="admin-items-title">Items</h4>
                        ${itemsHTML}
                    </div>

                    <div class="admin-actions">
                        <button class="admin-btn complete-btn" onclick="updateOrderStatus(${order.id}, 'Completed')">Mark Completed</button>
                        <button class="admin-btn cancel-btn" onclick="updateOrderStatus(${order.id}, 'Cancelled')">Cancel</button>
                        <button class="admin-btn pending-btn" onclick="updateOrderStatus(${order.id}, 'Pending')">Set Pending</button>
                        <button class="admin-btn delete-btn" onclick="deleteOrder(${order.id})">Delete</button>
                    </div>
                `;

                container.appendChild(orderCard);
            });
        })
        .catch(error => {
            console.error("Error loading orders:", error);
            document.getElementById("orders-container").innerHTML = "<p>Error loading orders.</p>";
        });
}

function updateOrderStatus(orderId, status) {
    fetch("../server/update_order_status.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order_id: orderId,
            status: status
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadOrders();
        } else {
            alert(data.message || "Failed to update order status.");
        }
    })
    .catch(error => {
        console.error("Status update error:", error);
        alert("Error updating status.");
    });
}

function deleteOrder(orderId) {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    fetch("../server/delete_order.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order_id: orderId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadOrders();
        } else {
            alert(data.message || "Failed to delete order.");
        }
    })
    .catch(error => {
        console.error("Delete error:", error);
        alert("Error deleting order.");
    });
}

loadOrders();
