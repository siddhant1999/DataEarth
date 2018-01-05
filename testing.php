<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

//$crawler = $client->request('GET', 'https://www.bloomberg.com/');

//echo $crawler;
$xml = file_get_contents("http://www.bloomberg.com/");
echo $xml;
 ?>