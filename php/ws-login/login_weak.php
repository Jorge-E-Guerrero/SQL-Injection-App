<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
$method = $_SERVER['REQUEST_METHOD'];
    include "conectar_weak.php";
    $mbd = conectarDB();
    //sleep(1);	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);  
    session_start();    
    //$mbd->set_charset('utf8');
	    
	$mail = $dataObject->mail;
	$password =	$dataObject->password;
  

  $sql = "select * FROM users WHERE mail = '$mail' and password = '$password' ; ";
  //$sql = "select * FROM users WHERE mail = '' OR 1=1 # and password = '123' ";
  $consulta = $mbd->query($sql);

  if($consulta == TRUE and $consulta->rowCount() != 0){
    echo json_encode($consulta->fetchall());		
  }
  else
  {
    echo  json_encode(array('error'=>true)) ;
  }
  
?>
