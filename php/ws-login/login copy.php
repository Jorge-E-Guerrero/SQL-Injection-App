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
  

  $sql = "select * FROM users WHERE mail = '$mail' and password = '$password' ; ";
  //$sql = "select * FROM users WHERE mail = '' OR 1=1 # and password = '123' ";
  $consulta = $mysqli->query($sql);

  if($consulta == TRUE and $consulta->num_rows != 0){
    echo json_encode($consulta->fetch_all());		
  }
  else
  {
    echo  json_encode(array('error'=>true)) ;
  }
  
  /*
  if ($nueva_consulta = $mysqli->prepare("SELECT 
  usuarios.nombre, usuarios.clave, usuarios.apellidos, usuarios.usuario, usuarios.idTipoUsuario, usuarios.id, tipo_usuario.etiquetaTipoUsuario, tipo_usuario.descripcionTipoUsuario 
  FROM usuarios 
  INNER JOIN tipo_usuario ON usuarios.idTipoUsuario = tipo_usuario.idTipoUsuario
  WHERE usuario = ?")) {
        $nueva_consulta->bind_param('s', $usuario);
        $nueva_consulta->execute();
        $resultado = $nueva_consulta->get_result();
        if ($resultado->num_rows == 1) {
            $datos = $resultado->fetch_assoc();
             $encriptado_db = $datos['clave'];
            if (password_verify($pas, $encriptado_db))
            {
                $_SESSION['usuario'] = $datos['usuario'];
                echo json_encode(array('conectado'=>true,'usuario'=>$datos['usuario'], 'nombre'=>$datos['nombre'],  'apellidos'=>$datos['apellidos'], 'id'=>$datos['id'], 'idTipoUsuario'=>$datos['idTipoUsuario'], 'etiquetaTipoUsuario'=>$datos['etiquetaTipoUsuario']  ) );
              }

               else {

                 echo json_encode(array('conectado'=>false, 'error' => 'La clave es incorrecta, vuelva a intentarlo.'));
                    }
        }
        else {
              echo json_encode(array('conectado'=>false, 'error' => 'El usuario no existe.'));
        }
        $nueva_consulta->close();
      }
      else{
        echo json_encode(array('conectado'=>false, 'error' => 'No se pudo conectar a BD'));
      }
 // }*/
$mysqli->close();
?>
