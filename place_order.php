<?php
header("Content-Type: application/json")

$conn = new mysqli("localhost", "root", "", "munchiecart");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$first_name = $data["first_name"];
$last_name = $data["last_name"];
$email = $data["email"];
$address_line1 = $data["address_line1"];
$address_line2 = $data["address_line2"];
$phone = $data["phone"];
$total_price = $data["total_price"];
$items = $data["items"];

$sql = "INSERT INTO orders
(first_name, last_name, email, address_line1, address_line2, phone, total_price)
VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
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
$stmt->execute();

$order_id = $stmt->insert_id;

$item_sql = "INSERT INTO order_items (order_id, meal_id, meal_name, quantity, price, customizations)
VALUES (?, ?, ?, ?, ?, ?)";
$item_stmt = $conn->prepare($item_sql);

foreach ($items as $item) {
    $meal_id = $item["id"];
    $meal_name = $item["name"];
    $quantity = $item["quantity"];
    $price = $item["price"];
    $customizations  = isset($item["customizations"]) ? json_encode($item["customizations"]) : null;

    $item_stmt->bind_param("iisids", $order_id, $meal_id, $meal_name, $quantity, $price, $customizations);
    $item_stmt->execute();
}

echo json_encode(["success" => true, "order_id" => $order_id]);

$stmt->close();
$item_stmt->close();
$conn->close();
?>
