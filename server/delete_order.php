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

if (!$data || !isset($data["order_id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing order ID"
    ]);
    exit;
}

$order_id = (int)$data["order_id"];

$sql = "DELETE FROM orders WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare delete statement"
    ]);
    exit;
}

$stmt->bind_param("i", $order_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Order deleted successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete order"
    ]);
}

$stmt->close();
$conn->close();
?>
