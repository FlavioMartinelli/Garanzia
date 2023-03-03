<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fatture</title>

    <link rel="stylesheet" href="styleCan.css">
</head>
<body>
    <a href="index.html">Indietro</a><br>
    <h1>Manager Fatture</h1>
    <table cellspacing='0'>
        <tr>
        <th>Numero Fattura</th>
        <th>Data Fattura</th>
        <th>Elimina</th>
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

        $sql = "SELECT * FROM Fattura";
        $result = $conn->query($sql);
        $i = 1;
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $i += 1;
                $nr = $row['numero_commessa'];
                $data = $row['data_fattura'];
                echo '<tr><td>'.$nr.'<td>'.$data.'<td><button onclick="deleteF('.$nr.')">Elimina</button></tr>';
            }
        } 
        $conn->close();
    ?>
    </table>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
    <script>
        function deleteF(x){
            var r = confirm("Confermare eliminazione");
            if (r == true) {
            $.ajax({
            type: "POST",
            url: "elimina.php",
            data: {
                'nr': x
            },
            success: function (x) {
                location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
            } 

        }
    </script>
</body>
</html>