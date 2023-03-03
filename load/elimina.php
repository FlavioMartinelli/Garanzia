<?php
$nr = $_POST['nr'];

$user='sidelsrl_garan';
$password='SidelGaran2020@';
$db='sidelsrl_garanzia';
$host='localhost';

// Create connection
$conn = new mysqli($host, $user, $password, $db);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "DELETE FROM `Prodotto` WHERE `numero_commessa` IN ('".$nr."')";
$result = $conn->query($sql);
$sql = "DELETE FROM `Fattura` WHERE `numero_commessa` IN ('".$nr."')";
$result = $conn->query($sql);

$conn->close();
?>