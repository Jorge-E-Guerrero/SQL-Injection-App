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

	
	$mail = $dataObject-> mail;
	$password =	$dataObject-> password;
	$nombre = $dataObject-> nombre;
	$edad = $dataObject-> edad;
	$telefono = $dataObject-> telefono;
	$direccion = $dataObject-> direccion;
	$tipo_usuario =	$dataObject-> tipo_usuario;


	$sql = "Insert into users (mail, password, user_type) values ('$mail','$password','$tipo_usuario')";


	if ($mysqli->query($sql) == TRUE) {

		$id = $mysqli->insert_id;
		$sql2 = "Insert into info (user_id, name, phone, address) values ('$id','$nombre','$edad', '$direccion')";

		if($mysqli->query($sql2) == TRUE){
			if ($nueva_consulta = $mysqli->prepare("SELECT * FROM users WHERE user_id = ?")) {
				$nueva_consulta->bind_param('i', $id);
				$nueva_consulta->execute();
				$resultado = $nueva_consulta->get_result();
					if ($resultado->num_rows == 1) {
					echo json_encode($resultado->fetch_all());
					} else {
						echo  json_encode(array('error'=>true)) ;
					}
				} else {
					echo  json_encode(array('error'=>true)) ;
				}
		} else {
			echo  json_encode(array('error'=>true)) ;
		}
	} else {
		echo  json_encode(array('error'=>true)) ;
	}



 
$mysqli->close();
?>