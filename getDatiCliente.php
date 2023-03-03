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

$sql = "SELECT *
FROM Cliente
WHERE id_cliente IN (SELECT cliente FROM Fattura WHERE numero_commessa=$nrFattura)";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data = "\n\n•Cliente:\nCognome:". $row['cognome'] ."\nNome:". $row['nome'] ."\nEmail:". $row['email'] ."\nTelefono:". $row['telefono'] ."\nIndirizzo:". $row['indirizzo'] . ", ". $row['citta'] . "(" . $row['porvincia'] . ")";
    echo $data;
} else {
    echo "";
}
$conn->close();
?>