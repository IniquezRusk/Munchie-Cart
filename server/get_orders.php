<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "munchiecart");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

$sql = "SELECT * FROM orders ORDER BY id DESC";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Orders query failed: " . $conn->error
    ]);
    exit;
}

$orders = [];

while ($row = $result->fetch_assoc()) {
    $order_id = (int)$row['id'];

    $items_sql = "SELECT * FROM order_items WHERE order_id = $order_id";
    $items_result = $conn->query($items_sql);

    if (!$items_result) {
        echo json_encode([
            "success" => false,
            "message" => "Order items query failed: " . $conn->error
        ]);
        exit;
    }

    $row['items'] = [];

    while ($item = $items_result->fetch_assoc()) {
        $row['items'][] = $item;
    }

    $orders[] = $row;
}

echo json_encode([
    "success" => true,
    "orders" => $orders
]);

$conn->close();
?>