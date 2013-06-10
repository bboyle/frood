/*
 * frood
 * https://github.com/Ben/frood
 *
 * Copyright (c) 2013 Ben Boyle
 * Licensed under the MIT license.
 */
(function( $ ) {
	'use strict';


	// http://www.html5rocks.com/en/tutorials/dnd/basics/#toc-creating-dnd-content

	// button handler
	$( document ).on( 'click', 'button', function() {
		var button = $( this );

		switch ( button.text() ) {
			case 'New form':
				// create textarea for user to enter questions
				(function() {
					var textarea = $( '<textarea></textarea>' );
					button.after( textarea );
					textarea.before( 'List your questions below:' );
					textarea.focus();
					textarea.after( '<button>Create form</button>' );
				}());
			break;

			case 'Create form':
				// create a form
				(function() {
					var form = $( '<form></form>' ),
						questions = $( 'textarea' ).val().split( '\n' );

					$.each( questions, function( index, label ) {
						var id = label.replace( /\s+/, '-' ).toLowerCase();
						form.append( '<label for="' + id + '">' + label + '</label>' );
						form.append( '<input id="' + id + '">' );
					});

					button.after( form );
				}());
			break;
		}
	});



}( jQuery ));
