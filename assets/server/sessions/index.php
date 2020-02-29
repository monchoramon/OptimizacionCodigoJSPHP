<?php

	/**
	 * variables de session
	 */

	session_start();

	class session {
		
		function __construct(){

		}

		public function variables() {

			$identificadores = $_GET['identificadores'];

			foreach ($identificadores as $key => $value) {
				$_SESSION[$value] = $_GET['params'][$key];
			}

			print_r(json_encode( array( 'sessions', $_SESSION["numero_trabajador"], $_SESSION["opcion"] ) ));

		}

		// public function unset_variables_session(){
		// 	print_r(json_encode( array( ' abc: ' => $_SESSION['numero_trabajador'] ) ));
		// }


	}	

?>