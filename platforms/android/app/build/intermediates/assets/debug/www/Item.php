<?php
if (function_exists($_GET['f'])){
    $_GET['f']();
}
function OpenDB(){
    $DB_HOST = 'db.sinners.be';
    $DB_USERNAME = 'r0761272';
    $DB_PASSWORD = 'dristan19970';
    $DB_DATABASE = 'r0761272';

    // open connection to mysql
    $connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
    mysqli_set_charset($connection, "utf8");

    return $connection;
}


function getitems(){
    $connection = OpenDB();

    // DB query
    // DB query
    $sql = "select * from item";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

// close the db connection
    mysqli_close($connection);

// create array
    $json = array();

    while($row =mysqli_fetch_assoc($result))
    {
        $json[] = $row;
    }

// send JSON to browser
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    echo json_encode($json);

}


function GetItem(){
    $connection = OpenDB();
    $id=$_POST['id'];
    // DB query
    // DB query
    $sql = "select * from item where id= $id";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

// close the db connection
    mysqli_close($connection);

// create array
    $json = array();

    while($row =mysqli_fetch_assoc($result))
    {
        $json[] = $row;
    }

// send JSON to browser
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    echo json_encode($json);
}

function AddItem(){
    $connection = OpenDB();

    $name=$_POST['name'];
    $image=$_POST['image'];
    $location=$_POST['location'];

    // DB query
    $sql = "INSERT INTO item (Naam, Locatie, Actief, Foto) VALUES ('$name', '$location', TRUE, '$image')";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    // close the db connection
    mysqli_close($connection);
}
