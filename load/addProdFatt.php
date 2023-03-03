<?php
$nrFattura = $_POST["nFattura"];
$dataFattura = $_POST["dataFattura"];

$riferimento = $_POST["riferimento"];
$codice = $_POST["codice"];
$tipologia = $_POST["tipologia"];
$ferramenta = $_POST["ferramenta"];
$lunghezza = $_POST["lunghezza"];
$altezza = $_POST["altezza"];
$legno = $_POST["legno"];
$finitura = $_POST["finitura"];
$vetro = $_POST["vetro"];

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

$sql = "SELECT * FROM Fattura
WHERE numero_commessa='$nrFattura';";
$result1 = $conn->query($sql);

if (mysqli_num_rows($result1)==0) {
    $queryProdotti="INSERT INTO `Fattura`
    (`numero_commessa`,
    `data_fattura`,
    `cliente`)
    VALUES
    ('$nrFattura',
    '$dataFattura',
    '0');";
    $result2 = $conn->query($queryProdotti);
} 

$queryProdotti1="SET FOREIGN_KEY_CHECKS=0;";
$result3 = $conn->query($queryProdotti1);
$queryProdotti1="INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '$nrFattura', '$riferimento', '$codice', '$tipologia', '$ferramenta', '$lunghezza', '$altezza', '$legno', '$finitura', '$vetro');";
$result3 = $conn->query($queryProdotti1);
$queryProdotti1="SET FOREIGN_KEY_CHECKS=1;";
$result3 = $conn->query($queryProdotti1);

$conn->close();

?>