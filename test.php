<?php
    $fattura = $_POST['test'];

    $user = 'root';
    $password = 'root';
    $db = 'sidelsrl_garanzia';
    $host = 'localhost';
    $port = 8889;

    $link = mysqli_init();
    $success = mysqli_real_connect(
        $link,
        $host,
        $user,
        $password,
        $db,
        $port
    );

    if ($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $queryProdotti= "INSERT INTO `Fattura` (`numero_commessa`, `data_fattura`) VALUES ('43', '2020-05-01');";

    mysqli_query($conn, $queryProdotti);
?>