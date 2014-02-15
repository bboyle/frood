(function( $ ) {
	'use strict';


	module( 'Drag and drop' );


	test( 'draggable property', 1, function() {
		var draggableQuestions = $( 'ol.questions > li' ).filter(function() {
			return $( this ).prop( 'draggable' ) === true;
		});

		strictEqual( draggableQuestions.length, 3, 'All questions are draggable' );
	});


}( jQuery ));
