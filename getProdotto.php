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

$sql = "SELECT
p.riferimento,
p.tipologia,
p.lunghezza,
p.altezza
FROM Fattura f JOIN Prodotto p ON f.numero_commessa=p.numero_commessa WHERE f.numero_commessa=".$nrFattura;

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $i = 0;
    $echo = "";
    while($row = $result->fetch_assoc()) {
        $echo .= '<tr><td>'.$row["riferimento"].'<td>'.$row["tipologia"].'<td>'.$row["lunghezza"].'<td>'.$row["altezza"].'<td><input class="checkProdottoGaranzia" onchange="javascript:checkAssistenza('.$row["riferimento"].');" value="'.$row["riferimento"].'" type="checkbox"></tr>';
        $i += 1;
    }
    echo $echo;
}

$conn->close();






//TABELLA
/*

$queryProdotti="
SELECT
p.riferimento,
p.tipologia,
p.lunghezza,
p.altezza
FROM Fattura f JOIN Prodotto p ON f.numero_commessa=p.numero_commessa WHERE f.numero_commessa=".$nrFattura;
*/



/*
$i = 1;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if($row["tipologia"]=="F"){
            $tipo = "Finestra";
        } else {
            $tipo = "Porta-Finestra";
        }
    echo '<tr><td>'.$row["riferimento"].'<td>'.$tipo.'<td>'.$row["larghezza"].'<td>'.$row["altezza"].'<td><input class="checkProdottoGaranzia" onchange="checkAssistenza('.$i.');" value="'.$i.'" type="checkbox"><tr class="detailsProdottoGaranzia"></tr>';
    $i += 1;
            }
} else {
    echo "<script>alert('Nessuna fattura trovata. Controlla che il numero inserito sia corretto o registra i tuoi prodotti per attivare la garanzia')</script>";
}
*/
?>
