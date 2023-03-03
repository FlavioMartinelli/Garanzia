<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$connection = ssh2_connect('62.149.150.194', 22);
ssh2_auth_password($connection, 'Sql682183', '438e8ec5');

$stream = ssh2_exec($connection, '/usr/local/bin/php -i');
*/
$oggetto = $_POST["oggetto"];
$descrizione = $_POST["descrizione"];
$componente = $_POST["componente"];
$prioritaPost = $_POST["prioritaPost"];
$department = $_POST["dep"];
$authorID = 6279;
$date = date('Y-m-d H:i:s');

//DATA
$user='sidelsrl_eser456';
//$user='Sql682183';
$password='si345@-rv';
//$password='438e8ec5';
$db='sidel_eservice';
//$db='Sql682183_2';
$host='localhost';
//$address='62.149.150.194';
//$port = 3307;

//shell_exec("ssh -f -L 127.0.0.1:3307:127.0.0.1:3306 user@remote.rjmetrics.com sleep 60 >> logfile");  

// Create connection
$conn = new mysqli($host, $user, $password, $db);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($conn) {
    echo '1'; //connected
  } else {
    echo '0'; //not connected
  }

$sql = "INSERT INTO `wp_aiosc_tickets` (`ID`, `subject`, `content`, `status`, `author_id`, `priority_id`, `priority_level`, `department_id`, `op_id`, `awaiting_reply`, `collab_ids`, `attachment_ids`, `ticket_meta`, `is_public`, `closure_note`, `closure_requested`, `feedback_stars`, `feedback_comment`, `hash_code`, `date_created`, `date_open`, `date_closed`, `last_update`)VALUES (NULL, '$oggetto', '$descrizione', 'queue', '$authorID', '$prioritaPost', '0', '$department', '16', 'N', '', '', '', 'N', '', 'N', '0', '', '', '$date', '$date', '$date', NULL);";
$result = $conn->query($sql);

$conn->close();

?>