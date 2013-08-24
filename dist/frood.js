/*! Frood - v0.0.2 - 2013-08-24
* https://github.com/bboyle/frood
* Copyright (c) 2013 Ben Boyle; Licensed MIT */
/*global frood:true*/
var frood = frood || {};
frood.dragAndDrop = (function( $ ) {
	'use strict';


	// http://www.html5rocks.com/en/tutorials/dnd/basics/#toc-creating-dnd-content

	var dragSrcEl,
		module
	;


	// start dragging (css style)
	function handleDragStart( e ) {
		/*jshint validthis:true */

		// stop nested handlers from firing on containing elements
		e.stopImmediatePropagation();

		var question = $( this );

		dragSrcEl = question;
		question.addClass( 'no-drop' );
		question.next().addClass( 'no-drop' );

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData( 'text/html', question.html() );
	}


	// fires once when dragging over drop targets (apply css)
	function handleDragEnter() {
		/*jshint validthis:true */
		var target = $( this );
		if ( ! target.hasClass( 'no-drop' )) {
			$( this ).addClass( 'drop-target' );	
		}
	}


	// suppress: fires continuously while dragging over target
	function handleDragOver( e ) {
		if ( e.preventDefault ) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
		return false;
	}


	// fires when leaving a drop target (reset css)
	function handleDragLeave() {
		/*jshint validthis:true */
		$( this ).removeClass( 'drop-target' );
	}


	function handleDrop( e ) {
		/*jshint validthis:true */
		// this / e.target is current target element.
		if ( e.stopPropagation ) {
			e.stopPropagation(); // stops the browser from redirecting.
		}
		// Don't do anything if dropping the same column we're dragging.
		if ( dragSrcEl[ 0 ] !== this ) {
			// Set the source column's HTML to the HTML of the column we dropped on.
			$( this ).before( dragSrcEl );
		}
		// See the section on the DataTransfer object.
		return false;
	}


	function handleDragEnd() {
		$( '.questions > li' ).removeClass( 'no-drop drop-target' );
	}


	module = {};


	module.init = function() {
		$( '.questions > li' ).each(function() {
			// setup drag and drop
			this.addEventListener( 'dragstart', handleDragStart, false );
			this.addEventListener( 'dragenter', handleDragEnter, false );
			this.addEventListener( 'dragover', handleDragOver, false );
			this.addEventListener( 'dragleave', handleDragLeave, false );
			this.addEventListener( 'drop', handleDrop, false );
			this.addEventListener( 'dragend', handleDragEnd, false );

			$( this ).prop( 'draggable', true );
		});
	};


	// on DOM ready
	$( module.init() );

	// return module
	return module;

}( jQuery ));

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
