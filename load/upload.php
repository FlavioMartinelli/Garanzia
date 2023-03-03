<?php
    $fattura = $_POST['numeroFattura']; 
    $query = $_POST['query']; 
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

    

    
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

// closing connection 
mysqli_close($conn); 
?>