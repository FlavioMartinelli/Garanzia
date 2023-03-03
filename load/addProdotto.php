<?php
$nrFattura = $_POST["nFattura"];
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


$queryProdotti="SET FOREIGN_KEY_CHECKS=0;
INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '$nrFattura', '$riferimento', '$codice', '$tipologia', '$ferramenta', '$lunghezza', '$altezza', '$legno', '$finitura', '$vetro');
SET FOREIGN_KEY_CHECKS=1;";
echo $queryProdotti;

$result = $conn->query($queryProdotti);

$conn->close();

?>