
<?php
	
	include_once 'index.php';

	$registro = new registro();

	switch ( $_SESSION["opcion"] ) {

		case 1:
			$registro->empleado();
		break;

	}

?>