<?php
    
$nrFattura = $_POST["nFattura"];

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

$sql = "SELECT numero_commessa FROM Fattura WHERE numero_commessa=".$nrFattura;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '0';//trovata
} else{
    echo '1';//non trovata
}
$conn->close();

// closing connection 
mysqli_close($conn); 
?>