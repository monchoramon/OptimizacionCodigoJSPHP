<?php 

class validaciones{

	public $tipo, $ctn_no_numericos, $ctn_no_string;

	function __construct(){

		$this->tipo = null;
		$this->ctn_no_numericos = 0;
		$this->ctn_no_string = 0;

	}

	//array unidimensional
	public function comp_u( $data, $tipo ) {

		$this->tipo = $tipo;

		foreach ( $data as $key => $value ) {
			foreach ($value as $key => $value) {
				validaciones::tipo_dato( $value );
			}	
		}

		validaciones::devolver_info();

		//print_r(json_encode( array( $ctn_no_numericos, $data ) ));
		//validaciones::numerico_b();

	}

	//array bidimensional
	public function comp_b( $data, $tipo ){

		// $data[0][0][0] = 1;
		// $data[0][0][1] = 2;
		// $data[0][0][2] = 'a';

		$this->tipo = $tipo;

		foreach ( $data as $key => $value ) {
			foreach ( $value as $key => $value ) {
				foreach ($value as $key => $value) {
					validaciones::tipo_dato( $value );
				}
			}
		}

		validaciones::devolver_info();

		//print_r(json_encode( $ctn_no_numericos ));	
		

	}

	public function tipo_dato( $value ){

		if( $this->tipo ){
			if( !is_numeric($value) || empty($value) ){
				$this->ctn_no_numericos++;
			}
		}else{
			if( !is_string($value) || empty($value) ){
				$this->ctn_no_string++;
			}
		}


	}

	public function devolver_info(){

		if( $this->tipo ){

			if( $this->ctn_no_numericos > 0 ){
				return true;
			}else{
				return false;
			}

		}else{

			if( $this->ctn_no_string > 0 ){
				return true;
			}else{
				return false;
			}

		}

	}


}

?>