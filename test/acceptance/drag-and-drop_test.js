casper.test.begin( 'Drag and drop', 7, function suite( test ) {
	'use strict';


	casper.start()
	// .userAgent( 'Mozilla/5.0 (Macintosh; Intel Mac OS X)' )

	.thenOpen( 'test/acceptance/drag-and-drop.html', function() {
		test.assertTitle( 'Drag and drop tests · Frood acceptance tests', 'opened test page' );
		test.assertSelectorHasText( '.questions li:first-child .label', 'Name', 'First question is "Name"' );
		test.assertSelectorHasText( '.questions li:nth-child(2) .label', 'Email', 'Second question is "Email"' );
		test.assertSelectorHasText( '.questions li:nth-child(3) .label', 'Message', 'Third question is "Message"' );
		// this.captureSelector( 'test/acceptance/drag-and-drop-init.png', 'form' );
	})

	// drag name down to message
	.then(function() {
		// drag by label (mousedown in input field does not allow dragging)
		var dragTarget, dropTarget, dragX, dragY, dropX, dropY;

		dragTarget = casper.getElementBounds( '.questions li:first-child' );
		dropTarget = casper.getElementBounds( '.questions li:nth-child(3)' );

		dragX = dragTarget.left + 1;
		dragY = dragTarget.top + 1;
		dropX = dropTarget.left + 1;
		dropY = dropTarget.top + 1;

		// http://phantomjs.org/api/webpage/method/send-event.html
		casper.page.sendEvent( 'mousemove', dragX, dragY );
		casper.page.sendEvent( 'mousedown', dragX, dragY );
		// casper.page.sendEvent( 'mousemove', dropX, dropY, 'left' );
		casper.page.sendEvent( 'mouseup', dropX, dropY );

		// http://docs.casperjs.org/en/latest/modules/mouse.html
		// casper.mouse.down( dragX, dragY );
		// casper.mouse.move( dropX, dropY );
		// casper.mouse.up( dropX, dropY );
	})
	// email should be first in form
	.then(function() {
		// this.captureSelector( 'test/acceptance/drag-and-drop-after.png', 'form' );
		test.assertSelectorHasText( '.questions li:first-child .label', 'Email', 'First question is now "Email"' );
		test.assertSelectorHasText( '.questions li:nth-child(2) .label', 'Name', 'Second question is now "Name"' );
		test.assertSelectorHasText( '.questions li:nth-child(3) .label', 'Message', 'Third question is still "Message"' );
	})


	.run(function() {
		test.done();
	});
});
