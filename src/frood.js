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

	var dragSrcEl;

	// start dragging (css style)
	function handleDragStart( e ) {
		/*jshint validthis:true */
		var question = $( this );
		question.addClass( 'dragging' );

		dragSrcEl = question;

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData( 'text/html', question.html() );
	}

	// fires once when dragging over drop targets (apply css)
	function handleDragEnter() {
		/*jshint validthis:true */
		$( this ).addClass( 'drop-target' );
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
		if ( dragSrcEl !== this ) {
			// Set the source column's HTML to the HTML of the column we dropped on.
			$( this ).before( dragSrcEl );
		}
		// See the section on the DataTransfer object.
		return false;
	}
	function handleDragEnd() {
		$( '.questions > li' ).removeClass( 'dragging drop-target' );
	}


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
