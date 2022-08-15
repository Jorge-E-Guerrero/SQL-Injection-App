<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];

function conectarDB(){

  $servidor = "localhost";
  $usuario = "root";
  $password = "";
  $bd = "sql_injection";
  //$bd = "cajaherr_datos";
  

    $conexion = new PDO('mysql:host=localhost;dbname=sql_injection', $usuario, $password);

        if($conexion){
            echo "";
        }else{
            echo 'Ha sucedido un error inexperado en la conexion de la base de datos';
        }

    return $conexion;
}
?>
