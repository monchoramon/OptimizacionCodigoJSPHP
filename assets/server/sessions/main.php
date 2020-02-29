
<?php
	
	include_once 'index.php';

	$session = new session();


	// if( $_SESSION["opcion"] ){
	// 	$opc = $_SESSION["opcion"];
	// }else{
	// 	$opc = 0;
	// }

	$opc = 0;
	
	switch ( $opc ) {

		case 0:
			$session->variables();
		break;

		// case 1:
		// 	$session->unset_variables_session();
		// break;

	}

?>