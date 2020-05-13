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

$queryID= $_POST['sqlID'];
//$src1= $_POST['sqlQuery'];
$src1= "SELECT * FROM Species WHERE Species_ID='". $queryID. "';";

$result = $conn->query($src1);
    
    
    $species = array();
    
    
    while ($row = $result->fetch_array()){
        $row1 = array();

        $row1["Species_Name"] = $row['Species_Name'];
        $row1["Species_Scientific_Name"] = $row['Species_Scientific_Name'];
        $row1["Species_ID"] = $row['Species_ID'];
        $row1["Species_Desc"] = $row['Species_Desc'];
        $row1["Species_isBiotic"] = $row['Species_isBiotic'];
        $row1["Parent_ID"] = $row['Parent_ID'];
        $row1["Species_Low_Weight"] = $row['Species_Low_Weight'];
        $row1["Species_High_Weight"] = $row['Species_High_Weight'];
        $row1["Species_Weight_Units"] = $row['Species_Weight_Units'];
        $row1["Species_Image_URL"] = $row['Species_Image_URL'];
        $row1["Subgroup_ID"] = $row['Subgroup_ID'];
        $row1["Category_ID"] = $row['Category_ID'];
        $row1["Date_Added"] = $row['Date_Added'];
        $row1["Date_Updated"] = $row['Date_Updated'];
        $row1["Date_Last_Queried"] = $row['Date_Last_Queried'];


        
        $species[] = $row1;
    
    }

$src2= "SELECT * FROM Connections WHERE Species_1_ID='". $queryID ."' ORDER BY Connection_Type DESC;";

$results = $conn->query($src2);
    
    $connections = array();
    
    while ($rows = $results->fetch_array()){
        $row2 = array();

        $row2["Connection_ID"] = $rows['Connection_ID'];
        $row2["Species_1_ID"] = $rows['Species_1_ID'];
        $row2["Species_2_ID"] = $rows['Species_2_ID'];
        $row2["Connection_Type"] = $rows['Connection_Type'];
        $row2["Connection_Desc"] = $rows['Connection_Desc'];
        $row2["Connection_Priority"] = $rows['Connection_Priority'];
        $row2["Date_Added"] = $rows['Date_Added'];
        $row2["Date_Updated"] = $rows['Date_Updated'];

        
        $connections[] = $row2;
    
    }
//echo json_encode(array("data"=>$species));
echo json_encode(array(
    "data"      => array(
        "species"   => $species,
        "connections" => $connections
        )
        
    )
);
?>