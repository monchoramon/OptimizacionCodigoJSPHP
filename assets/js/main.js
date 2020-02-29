
$(function(){

		var data =  [
			    		{ "data": "numero_trabajador" },
			            { "data": "nombre" },
			            { "data": "apellido_paterno" },
			            { "data": "apellido_materno" },
			            { "data": "puesto" },
			            { "data": "fecha_nacimiento" },
			            { "data": "correo" },
			            { "data": "salario" },
			            { "data": "contratista" },
						{"defaultContent":"<button class='btn btn-primary' type='button' id='eliminar_btn'>Eliminar</button>"},
			    		{"defaultContent":"<button class='btn btn-primary' type='button' id='actualizar_btn'>Actualizar</button>"}
		    		]

		//función para pintar los datos en la tabla especificada devueltos de la consulta PHP por medio de ajax, recibe dos parametros,
		//el primero son los campos que regresa la consulta SQL, el otro es el ID de la tabla donde se van  a pintar los datos.
		var tabla_dat = Nucleo.data_table_ajax( data, '#empleados', 'empleados' )


		//Igualar variables de session, según parametros.
		var params = {
			0:null,
			1:1
		}

		var identi_params = {
			0:'numero_trabajador',
			1:'opcion'
		}

		Nucleo.input_hidden( params, 'sessions', identi_params );

	    $('#empleados tbody').on('click', '#actualizar_btn', function () {

	    	//Se inicializa de nuevo para no perder los datos obtenidos.
	    	var tabla_dat = Nucleo.data_table_ajax( data, '#empleados', 'empleados' )

	    	//hace referencia al contexto donde se da click.
			var _this = $(this); 

			//Obtenemos los datos por fila de la tabla
			var row = Nucleo.get_data_rows( _this, tabla_dat ); 

			console.log( row, _this, tabla_dat )

			//Se excluyen los inputs de type radio y checkbox
			var identificadores_i_p = [ 'nombre', 
										'apellido_paterno', 
										'apellido_materno', 
										'puesto', 
										'fecha_nacimiento', 
										'correo', 
										'salario',
										'contratista',
										'deporte' ];

			var data_return = [ row["nombre"], 
								row["apellido_paterno"], 
								row["apellido_materno"], 
								row["puesto"], 
								row["fecha_nacimiento"], 
								row["correo"], 
								row["salario"], 
								row["contratista"],
								'Opción 2' ];

				//función para pintar los datos en un form (inputs, select, etc.) => si se desean actualizar los registros,
				//recibe 3 parametros, el primero hace referencia a los identificadores de los tags
				//pueden ser id, name y class, el siguiente es el tipo de tag, input, select, radiobutton y checkbox
				//por último se mandan los datos que se quieren pintar.
				// 0 => input
				// 1 => selectS
				// 2 => radiobutton
				// 3 => checkbox
				Nucleo.pintar_datos_tags( identificadores_i_p, data_return, '#registro' );
			
				//El objeto params recibe los datos que se tomaran para generar las varibles de sesión.
				var params = {
					0:row["numero_trabajador"],
					1:1
				}

				//El objeto identi_params se utilizara para nombrar a las variabe de sesión
				var identi_params = {
					0:'numero_trabajador',
					1:'opcion'
				}

				//La función input hidden alamcena en PHP el valor de la variable el cual hace referencia
				//a la data que se va a actualizar, puede ser un id, o algún otro campo en especifico. 
				Nucleo.input_hidden( params, 'sessions', identi_params );

				//Función para activar modal, recibe un parametro, el id del modal.
				Nucleo.activar_modal("#datos_usuario");

				//console.log( data, tabla_dat )


		})


		$("#empleados tbody").on('click', '#eliminar_btn', function () {

			var tabla_dat = Nucleo.data_table_ajax( data, '#empleados', 'empleados' )
			var row = Nucleo.get_data_rows( this, tabla_dat )

			//console.log( row )

		} )


		$("#btn_nuevo_registro").click(function() {

			Nucleo.activar_modal("#datos_usuario")
			Nucleo.clean_inputs('#registro')

		})


		$("#btn_registrar").click(function() {

			Nucleo.ajax( '#registro', null, 'registro_actualizacion', 1, null, null )

			Nucleo.destroy_table( '#empleados' )
			Nucleo.data_table_ajax( data, '#empleados', 'empleados' )
			Nucleo.searching( '#empleados' )
			Nucleo.hidden_modal( "#datos_usuario" )

		})
		

		$("#cancelar").click(function(){
			
			var params = {
				0:null,
				1:1
			}

			var identi_params = {
				0:'numero_trabajador',
				1:'opcion'
			}

			Nucleo.input_hidden( params, 'sessions', identi_params )


		})



})
