# steps


When /I drag the 'email question' to 'the top'/ do
	# drag up about 50 pixels
	# TODO calculate drag distance from top of form and Y-coordinate of field
	assert @browser.input( :id => 'email' ).parent.drag_and_drop_by 0, -50
end


Then /the 'email question' should be 'first in the form'/ do
	pending
end
