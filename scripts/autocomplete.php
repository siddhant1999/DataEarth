<?php
header('Content-Type: application/json');

$servername = "shareddb1d.hosting.stackcp.net";
$username = "dataearthdb-323131c3";
$password = "123456789";
$dbname = "dataearthdb-323131c3";

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection is good
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//$src1= $_POST['sqlQuery'];
$src1= "SELECT * FROM Species";

$result = $conn->query($src1);
    
    
    $species = array();
    
    
    while ($row = $result->fetch_array()){
        $row1 = array();

        $row1["Species_Name"] = $row['Species_Name'];
        $row1["Species_ID"] = $row['Species_ID'];
        $row1["Species_Scientific_Name"] = $row['Species_Scientific_Name'];
        
        //array_push($fullArray, $row1);
        //trying bracket notation
        $species[] = $row1;
        //we don't need the venture name because we query by it
    
    }

//echo json_encode(array("data"=>$species));
echo json_encode(array(
    "data"      => array(
        "country"   => $species
        )
        
    )
);
?>