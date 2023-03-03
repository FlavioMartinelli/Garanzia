<?php
$nrFattura = $_POST["nFattura"];
$dataFattura = $_POST["dataFattura"];

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

$queryProdotti="INSERT INTO `Fattura` (`numero_commessa`, `data_fattura`, `cliente`) VALUES ('$nrFattura', '$dataFattura', '0');";
echo $queryProdotti;

$result = $conn->query($queryProdotti);

$conn->close();

?>