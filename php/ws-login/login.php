<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
$method = $_SERVER['REQUEST_METHOD'];
    include "conectar.php";
    $mysqli = conectarDB();
    //sleep(1);	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);  
    session_start();    
    $mysqli->set_charset('utf8');
	    
	$mail = $dataObject->mail;
	$password =	$dataObject->password;
  

  $sql = $mysqli->prepare("select * FROM users WHERE mail = ? and password = ? ");
  $sql->bind_param('ss',$mail,$password);
  $sql->execute();

  $resultado = $sql->get_result();
  if($resultado->num_rows == 1) {
    $datos = $resultado->fetch_all();
    echo json_encode($datos);
  }
  else
  {
    echo  json_encode(array('error'=>true)) ;
  }
  
$mysqli->close();
?>
