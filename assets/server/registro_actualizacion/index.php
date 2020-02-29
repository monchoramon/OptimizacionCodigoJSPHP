<?php

	/**
	 * 
	 */

	include_once '../PDO/pdo.php';
	session_start();

	class registro {

		public $conexion;

		function __construct()
		{
			 $bd = new conexion();
			 $this->conexion = $bd->bd();
		}

		public function empleado() {

			@$nombre = $_GET['nombre'];
			@$apellido_paterno = $_GET['apellido_paterno'];
			@$apellido_materno = $_GET['apellido_materno'];
			@$puesto = $_GET['puesto'];
			@$fecha_nacimiento = $_GET['fecha_nacimiento'];
			@$correo = $_GET['correo'];
			@$salario = $_GET['salario'];
			@$contratista = $_GET['contratista'];

			@$id_usuario = $_SESSION['numero_trabajador'];

			if( !$id_usuario ){
				$stmt = $this->conexion->prepare('INSERT INTO empleados (nombre, apellido_paterno, apellido_materno, puesto, fecha_nacimiento, correo, salario, contratista) VALUES (?,?,?,?,?,?,?,?)');
			}else{
				$stmt = $this->conexion->prepare('UPDATE empleados SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, puesto = ?, fecha_nacimiento = ?, correo = ?, salario = ?, contratista = ? WHERE numero_trabajador = ?');

				$stmt->bindParam(9, $id_usuario );
			}
	
			$stmt->bindParam(1, $nombre );
			$stmt->bindParam(2, $apellido_paterno);
			$stmt->bindParam(3, $apellido_materno);
			$stmt->bindParam(4, $puesto);
			$stmt->bindParam(5,	$fecha_nacimiento );
			$stmt->bindParam(6, $correo);
			$stmt->bindParam(7, $salario);
			$stmt->bindParam(8, $contratista );

			if( $stmt->execute() ){
				unset( $_SESSION['numero_trabajador'] );
				print_r(json_encode( array('tipo'=>true, @$_SESSION['numero_trabajador'] ) ));
			}else{
				print_r(json_encode( array('tipo'=>false) ));
			}

		}

	}

?>