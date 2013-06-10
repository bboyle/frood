/*global frood*/
(function( $ ) {
	'use strict';


	var lifecycle = {
		setup: frood.dragAndDrop.init
	};


	module( 'Drag and drop', lifecycle );


	test( 'draggable property', 1, function() {
		var draggableQuestions = $( 'ol.questions > li' ).filter(function() {
			return $( this ).prop( 'draggable' ) === true;
		});

		strictEqual( draggableQuestions.length, 3, 'All questions are draggable' );
	});


}( jQuery ));
