<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "munchiecart");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No JSON data received",
        "debug" => file_get_contents("php://input")
    ]);
    exit;
}

if (!isset($data["items"])) {
    echo json_encode([
        "success" => false,
        "message" => "Items field is missing",
        "debug" => $data
    ]);
    exit;
}

$first_name   = $data["first_name"] ?? "";
$last_name    = $data["last_name"] ?? "";
$email        = $data["email"] ?? "";
$address_line1 = $data["address_line1"] ?? "";
$address_line2 = $data["address_line2"] ?? "";
$phone        = $data["phone"] ?? "";
$total_price  = $data["total_price"] ?? 0;
$items        = $data["items"];

if (!is_array($items) || count($items) === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Items array is empty or invalid",
        "debug" => $data
    ]);
    exit;
}

$conn->begin_transaction();

try {
    $sql = "INSERT INTO orders
    (first_name, last_name, email, address_line1, address_line2, phone, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Failed to prepare order statement: " . $conn->error);
    }

    $stmt->bind_param(
        "ssssssd",
        $first_name,
        $last_name,
        $email,
        $address_line1,
        $address_line2,
        $phone,
        $total_price
    );

    if (!$stmt->execute()) {
        throw new Exception("Failed to insert order: " . $stmt->error);
    }

    $order_id = $stmt->insert_id;

    $item_sql = "INSERT INTO order_items
    (order_id, meal_id, meal_name, quantity, price, customizations)
    VALUES (?, ?, ?, ?, ?, ?)";

    $item_stmt = $conn->prepare($item_sql);

    if (!$item_stmt) {
        throw new Exception("Failed to prepare order items statement: " . $conn->error);
    }

    $saved_items = [];

    foreach ($items as $item) {
        $meal_id = $item["id"] ?? null;
        $meal_name = $item["name"] ?? null;
        $quantity = $item["quantity"] ?? 1;
        $price = $item["price"] ?? null;
        $customizations = isset($item["customizations"])
            ? json_encode($item["customizations"])
            : null;

        if ($meal_id === null || $meal_name === null || $price === null) {
            throw new Exception("Invalid item data: " . json_encode($item));
        }

        $item_stmt->bind_param(
            "iisids",
            $order_id,
            $meal_id,
            $meal_name,
            $quantity,
            $price,
            $customizations
        );

        if (!$item_stmt->execute()) {
            throw new Exception("Failed to insert order item: " . $item_stmt->error . " | Item: " . json_encode($item));
        }

        $saved_items[] = [
            "meal_id" => $meal_id,
            "meal_name" => $meal_name,
            "quantity" => $quantity,
            "price" => $price,
            "customizations" => $customizations
        ];
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "order_id" => $order_id,
        "items_received_count" => count($items),
        "items_saved_count" => count($saved_items),
        "saved_items" => $saved_items
    ]);

    $stmt->close();
    $item_stmt->close();

} catch (Exception $e) {
    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage(),
        "data_received" => $data
    ]);
}

$conn->close();
?>