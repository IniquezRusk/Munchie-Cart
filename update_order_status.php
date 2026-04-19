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

if (!$data || !isset($data["order_id"]) || !isset($data["status"])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing order ID or status"
    ]);
    exit;
}

$order_id = (int)$data["order_id"];
$status = $data["status"];

$allowed_statuses = ["Pending", "Completed", "Cancelled"];

if (!in_array($status, $allowed_statuses)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid status"
    ]);
    exit;
}

$sql = "UPDATE orders SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare update statement"
    ]);
    exit;
}

$stmt->bind_param("si", $status, $order_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Order status updated"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update status"
    ]);
}

$stmt->close();
$conn->close();
?>
