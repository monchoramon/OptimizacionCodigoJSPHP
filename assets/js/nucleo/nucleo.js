	
	class Nucleo {

		constructor (){

			this.version_    = 1.5
			this.index_input = null
			this.tags = null
			this.tipe = null
			this.vuelta = null
			this.val_rad_sel = null
			this.checked_ = null

		}


		//datatable, id_tabla, directorio donde esta el script PHP
		static data_table_ajax( array_col, id_tabla, directorio_secundario, method_ = null ) { 

			$.fn.dataTable.ext.errMode = 0

		    var tabla_dat = $(id_tabla).DataTable( {

				ajax: {
					method: this.tipo_metodo( method_ ),
					cache: false,
			        url: 'assets/server/'+directorio_secundario+'/index.php',
			    },

			    responsive: true,

			    columns: array_col 

		    } );

			return tabla_dat;

		}

		// static inicializar_tabla( array_col, id_tabla, directorio_secundario ){
		// 	this.data_table_ajax( array_col, id_tabla, directorio_secundario )
		// }

		static get_data_rows( _this, tabla_dat ){
        	var data = tabla_dat.row( $(_this).parents("tr") ).data()
			return data
		}

		static destroy_table( id_tabla ){

			var table = $(id_tabla).DataTable( {
			    paging: false
			});
			 
			table.destroy();
			
		}

		static searching( id_tabla ){

			$(id_tabla).DataTable( {
			    searching: false
			} );

		}


		//Modales
		static activar_modal(id){
			$(id).modal({
				backdrop: 'static',
				keyboard:false
			}).show();
		}

		static hidden_modal(id){
			$(id).modal('hide')
		}

		//ajax, registro, actualización y eliminación de dato
		static ajax( form, params, directorio_secundario, method, opc_server, identi_params = null ) {

				var method = this.tipo_metodo( method ), dat_return = null;

				 $.ajax({

					url: 'assets/server/'+directorio_secundario+'/main.php', //_script.php
					data: this.tipo_datos_enviar( form, params, opc_server, identi_params ),
					method: method,

					success:function( data ){

					var request = JSON.parse( data );

					if( request ){
							
							switch(opc_server) {
								
								case 1:
									console.log('autocompletado')
								break;

								case 2:
									llenado_select( request, params, 1 )
								break;

								case 3:
									llenado_select( request, params, 2 )
								break;

								case 4:
									arreglo_autocompletado( request, prop_cam_autoC )
								break;

								case 5:
									pintar_data_input_conceptos( request )
								break;

								default:
									//console.log( request )
								break;


						}

					}

				}

			})

			// console.log( params )

		}


		static tipo_datos_enviar( form, params, opc_server = null, identi_params ) {

			var data = $(form).serialize()

			if( !form ){

				data = {
							params:params,
							opcion:opc_server,
							identificadores:identi_params
					   }

			}
			
			return data

		}

		static tipo_metodo( tipe ){

			var method = null;

				switch( tipe ){

					case 1:
						method = "GET";
					break;

					default:
						method = "POST";
					break;


				}

			return method;

		}


		static pintar_datos_tags( identificadores_i_p, data_return, id_seccion = 0 ){

			this.tags   = this.get_all_inputs( id_seccion )
			this.tipe   = 1
			this.vuelta = 0

			for(var x = 0; x < identificadores_i_p.length; x++){

				var attr_tag = identificadores_i_p[x]
				this.val_rad_sel = data_return[x]

				this.tipe_tag( attr_tag )

				if( this.index_input ){
					this.index_input.value = data_return[x]
				}

			}

			//console.log( this.tags )

		}

		//Esta función devuelve todos los inputs utilizados en arbol dentro de body HTML, 
		//puede ser de una area en especifica pasando para ello el ID de la sección para esto 
		//debe de utilizar siempre un contenedor para poder encontrar los elementos, como por 
		//ejemplo el uso de un div.
		static get_all_inputs( id_seccion ){

			var cadena = null

			if( id_seccion ){
				cadena = id_seccion+' input, select'
			}else{
				cadena = 'input, select'
			}

			var tags = document.querySelectorAll(cadena)
			
			return tags

		}

		//La función tipe_tag es utilizada para trabajar en conjunto con la función
		//comparacion_prop_attr esta última función toma los inputs encontrados dentro de una
		//sección en especifico o en general para comparar su propiedad name con las propiedades
		//pasadas en el primer parametro en forma de arreglo de la función pintar_datos_tags
		static tipe_tag( attr_tag ){

			for(var x = 0; x < this.tags.length; x++){
				this.comparacion_prop_attr( this.tags[x], attr_tag )
			}

		}

		//Función utilizada para la comparación de la propiedad name de los inputs, 
		//si ambos son iguales se ejecuta la función tipos_inputs la cual devuelve el input
		//en general para asignar los valores pasados como segundo parametro en la función 
		//pintar_datos_tags
		static comparacion_prop_attr( prop, attr_tag ){

			if( prop.name == attr_tag ){
				this.tipos_inputs(prop)
			}

		}


		//Esta función se utiliza para verificar a que tipo de input corresponde el segunde
		//parametro pasado en la función comparacion_prop_attr, la cual a su vez almacenara 
		//dentro de la variable index_input el input devuelto para pintar la data en el mismo 
		//según su tipo.
		static tipos_inputs(prop){

			switch( prop.type ){

				case "text":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop )
					}else{
						prop.value = ""
					}
				break;

				case "password":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop )
					}else{
						prop.value = ""
					}
				break;

				case "number":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop )
					}else{
						prop.value = ""
					}
				break;

				case "search":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop )
					}else{
						prop.value = ""
					}
				break;

				case "date":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop )
					}else{
						prop.value = ""
					}
				break;

				case "email":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop )
					}else{
						prop.value = ""
					}
				break;

				case "hidden":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop )
					}else{
						prop.value = ""
					}
				break;

				case "select-one":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop )
					}else{
						prop.value = ""
					}
				break;

				case "radio":
					if( !this.vuelta ){
						this.index_input = this.get_input( prop, 1 ) //1
					}else{
						if ( this.checked_.checked ) { this.checked_.checked = 0 }
					}
				break;

			}	

		}


		//Esta función devuelve el input en general al cual se va a sobrescribir  con algún
		//valor, se hace uso de una variable definida en el constructor de la clase la cual 
		//se utiliza para validar dos acciones, una es para mandar el input en general como ya 
		//se mencionó y la otra es para borrar el valor del input.
		static get_input( prop, radio_check = 0 ){

			if( !this.vuelta ){

				if( radio_check ){

					this.checked_ = $(prop.localName+"[value='"+this.val_rad_sel+"']")[0]
					this.checked_.checked = radio_check

					return 

				}else{

					var input = $(prop.localName+"[name='"+prop.name+"']")[0]
					return input

				}

			}else{
				this.tipos_inputs( prop )
			}

		}


		//Función para generar variables de session, recibe tres parametros, el primero es para 
		//definir el valor o los valores de las variables de session, y el tercero son los 
		//identificadores de cada variable de session.
		static input_hidden( params, directorio_secundario, identi_params ){
			this.ajax( null, params, directorio_secundario, 1, null, identi_params )
		}

		//Esta función recibe como parametro el identificador de la seccion donde se desee borrar
		//el valor de los inputs, puede ser nula si se desea borrar todos los valores de los inputs
		//en general dentro del body.
		static clean_inputs( id_seccion = null ) {

			this.vuelta = 1

			var inputs = this.get_all_inputs( id_seccion );
			
			for(var x = 0; x < inputs.length; x++){
				this.tipos_inputs(inputs[x])
			}

		}

		prueba(){
			console.log( this.version_ )
		}


	}

	// const nucleo = new Nucleo() //new Nucleo(1.0).prueba()
	// 


		