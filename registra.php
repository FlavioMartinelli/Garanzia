<?php
$nome = $_POST["nome"];
$cognome = $_POST["cognome"];
$telefono = $_POST["telefono"];
$email = $_POST["email"];
$indirizzo = $_POST["indirizzo"];
$citta = $_POST["citta"];
$provincia = $_POST["provincia"];
$nrFattura = $_POST["nFattura"];  
$codeGar = $_POST["codeGar"];   
//CONNECT
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



//INFO
$queryProdotti="INSERT INTO `Cliente` (`id_cliente`, `cognome`, `nome`, `email`, `telefono`, `indirizzo`, `citta`, `porvincia`, `codeGar`) VALUES (NULL, '".$cognome."', '".$nome."', '".$email."', '".$telefono."', '".$indirizzo."', '".$citta."', '".$provincia."', '".$codeGar."');";

$result = $conn->query($queryProdotti);
$last_id = mysqli_insert_id($conn);


$queryAutoInc = "SELECT `AUTO_INCREMENT`
FROM  INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'sidelsrl_garanzia'
AND   TABLE_NAME   = 'Cliente';";
$result = $conn->query($queryAutoInc);
echo $last_id;


if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data = $row['AUTO_INCREMENT'];
    $queryEditF = "UPDATE `Fattura` SET `cliente` = '".$last_id."' WHERE `numero_commessa` = '".$nrFattura."';";

    $result = $conn->query($queryEditF);
} 

$conn->close();
?>