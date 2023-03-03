<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fatture</title>

    <link rel="stylesheet" href="styleClienti.css">
</head>

<body>
    <a href="index.html">Indietro</a><br>
    <h1>Lista Clienti</h1>
    <table cellspacing='0' id="tableClienti">
        <tr>
            <th>Cognome
            <th>Nome
            <th>Email
            <th>Telefono
            <th>Indirizzo
            <th>Citta
            <th>Provincia

        </tr>
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

        $sql = "SELECT * FROM Cliente WHERE id_cliente != 0";
        $result = $conn->query($sql);
        $i = 1;
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $i += 1;
                $cogn = $row['cognome'];
                $nome = $row['nome'];
                $email = $row['email'];
                $tel = $row['telefono'];
                $ind = $row['indirizzo'];
                $citt = $row['citta'];
                $prov = $row['porvincia'];
                echo '<tr><td>'.$cogn.'<td>'.$nome.'<td>'.$email.'<td>'.$tel.'<td>'.$ind.'<td>'.$citt.'<td>'.$prov.'</tr>';
            }
        } 
        $conn->close();
    ?>
    </table>
    <button onclick="exportPDF();" style="margin-top:20px;">Esporta in pdf</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js" integrity="sha256-wHsYlzQ9EnjIdWOKOlQcOIw4imM+CDwRJ6NhkvJ96iY=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js" integrity="sha256-c3RzsUWg+y2XljunEQS0LqWdQ04X1D3j22fd/8JCAKw=" crossorigin="anonymous"></script>
    <script>
        function exportPDF() {
            html2canvas($('#tableClienti')[0], {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Clienti.pdf");
                }
            });
        }
    </script>
</body>

</html>