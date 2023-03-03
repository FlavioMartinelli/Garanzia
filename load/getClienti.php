<?php
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

$sql = "SELECT * FROM Cliente";
$result = $conn->query($sql);
$i = 1;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if($i>1){
            $nome = $row['nome'];
    $cognome = $row['cognome'];
    $email = $row['email'];
    $telefono = $row['telefono'];
    $indirizzo = $row['indirizzo'];
    $citta = $row['citta'];
    $porvincia = $row['porvincia'];
    echo '<tr><td>'.$cognome.'</td><td>'.$nome.'</td><td>'.$email.'</td><td>'.$telefono.'</td><td>'.$indirizzo.'</td><td>'.$citta.'</td><td>'.$porvincia.'</td><td></tr>';

        }
        $i += 1;
    
    }
    }
$conn->close();
?>