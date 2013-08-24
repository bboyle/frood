/*
 * frood
 * https://github.com/Ben/frood
 *
 * Copyright (c) 2013 Ben Boyle
 * Licensed under the MIT license.
 */

/*global frood:true*/
var frood = frood || {};
frood.newForm = (function( $ ) {
	'use strict';

	var questionMatcher = {},
		module = {}
	;


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
						var id = label.replace( /\s+/, '-' ).toLowerCase(),
							question
						;

						// do we know about this type of question?
						$.each( questionMatcher, function( key, value ) {
							if ( label.indexOf( key ) > -1 ) {
								question = value;
								// break loop
								return false;
							}
						});

						if ( question ) {
							question = question.clone();
							// change @id
							question.find( 'input' ).attr( 'id', id );
							question.find( 'label' ).attr( 'for', id ).text( label );

						} else {
							question = '<label for="' + id + '">' + label + '</label><input id="' + id + '">';
						}

						form.append( question );
					});

					button.after( form );
				}());
			break;
		}
	});


	// configuration for new form
	module.config = function( config ) {
		if ( config.questionMatcher ) {
			questionMatcher = config.questionMatcher;
		}
	};


	return module;

}( jQuery ));
