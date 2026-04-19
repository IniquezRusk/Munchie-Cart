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

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["items"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid order data"
    ]);
    exit;
}

$first_name = $data["first_name"];
$last_name = $data["last_name"];
$email = $data["email"];
$address_line1 = $data["address_line1"];
$address_line2 = $data["address_line2"];
$phone = $data["phone"];
$total_price = $data["total_price"];
$items = $data["items"];

$conn->begin_transaction();

try {
    $sql = "INSERT INTO orders
    (first_name, last_name, email, address_line1, address_line2, phone, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Failed to prepare order statement");
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
        throw new Exception("Failed to insert order");
    }

    $order_id = $stmt->insert_id;

    $item_sql = "INSERT INTO order_items
    (order_id, meal_id, meal_name, quantity, price, customizations)
    VALUES (?, ?, ?, ?, ?, ?)";

    $item_stmt = $conn->prepare($item_sql);

    if (!$item_stmt) {
        throw new Exception("Failed to prepare order items statement");
    }

    foreach ($items as $item) {
        $meal_id = $item["id"];
        $meal_name = $item["name"];
        $quantity = isset($item["quantity"]) ? $item["quantity"] : 1;
        $price = $item["price"];
        $customizations = isset($item["customizations"])
            ? json_encode($item["customizations"])
            : null;

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
            throw new Exception("Failed to insert order item");
        }
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "order_id" => $order_id
    ]);

    $stmt->close();
    $item_stmt->close();

} catch (Exception $e) {
    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}

$conn->close();
?>
