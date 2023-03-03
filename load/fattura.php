<?php
    $fattura = $_POST['numeroFattura']; 
    $user = 'root';
$password = 'root';
$db='sidelsrl_garanzia';
$host = 'localhost';
$port = 8889;
    $link=mysqli_init();
    $conn=mysqli_real_connect($link,
        $host,
        $user,
        $password,
        $db,
        $port);
    if ($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }
    $queryProdotti= "INSERT INTO `Fattura` (`numero_commessa`, `data_fattura`) VALUES ('95679', '2020-05-02');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '1', '01 LEADER NEW', 'F2', 'DK', '1465', '1460', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16ga');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '2', 'HS250_P', 'F2', 'HS', '1950', '2350', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16ga');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '3', '01 LEADER NEW', 'F2', 'MP', '1270', '2350', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16ga');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '4', '01 LEADER NEW', 'F2', 'DK', '765', '1425', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16ga');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '5', '01 LEADER NEW', 'F2', 'DK', '770', '1430', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16gas-33.1 can. warm edg');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '6', '01 LEADER NEW', 'F2', 'DK', '770', '1450', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16gas-33.1 can. warm edg');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '7', '01 LEADER NEW', 'F2', 'DK', '1260', '2350', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16ga');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '8', '01 LEADER NEW', 'F2', 'DK', '1120', '1435', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16ga');
    INSERT INTO `Prodotto` (`id_prodotto`, `numero_commessa`, `riferimento`, `codice`, `tipologia`, `ferramente`, `lunghezza`, `altezza`, `legno`, `finitura`, `vetro`) VALUES (NULL, '95679', '9', '01 LEADER NEW', 'F2', 'DK', '1120', '1430', 'OKOUME\'', 'N. 020 Noce Scuro', 'vetro 33.1 basso emissivo-16ga');";

    mysqli_query($conn, $queryProdotti);
?>