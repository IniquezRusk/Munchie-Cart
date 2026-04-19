<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "munchiecart");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

$orders = [];

$order_sql = "SELECT * FROM orders ORDER BY id DESC";
$order_result = $conn->query($order_sql);

while ($order = $order_result->fetch_assoc()) {
    $order_id = $order["id"];

    $items_sql = "SELECT meal_name, quantity, price, customizations
                  FROM order_items
                  WHERE order_id = $order_id";
    $items_result = $conn->query($items_sql);

    $items = [];
    while ($item = $items_result->fetch_assoc()) {
        $items[] = $item;
    }

    $order["items"] = $items;
    $orders[] = $order;
}

echo json_encode([
    "success" => true,
    "orders" => $orders
]);

$conn->close();
?>
