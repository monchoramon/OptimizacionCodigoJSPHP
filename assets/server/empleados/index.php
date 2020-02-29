<?php

	include_once '../PDO/pdo.php';

	/**
	 * Empleados
	 */

	class empelados {

		public $conexion;

		function __construct()
		{
			 $bd = new conexion();
			 $this->conexion = $bd->bd();
		}

		public function listar_empleados(){

			$stm = $this->conexion->prepare("SELECT * FROM empleados");
			$stm->execute();

			while ( $row = $stm->fetch(2) ) {
				$data[] =  $row;
			}

			print_r(json_encode( array('data' => @$data) ));

		}

	}

$empelados = new empelados();
$empelados->listar_empleados();

?>