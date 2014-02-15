# steps


When /I drag the 'email question' to 'the top'/ do
	# TODO calculate drag distance from top of form and Y-coordinate of field
	nameQuestion = @browser.label( :for => 'name' ).parent
	emailQuestion = @browser.label( :for => 'email' ).parent
	# messageQuestion = @browser.label( :for => 'message' ).parent
	assert_equal nameQuestion, @browser.ol( :class => 'questions' ).li, 'expected name to be first question in form'
	assert_equal emailQuestion, @browser.ol( :class => 'questions' ).lis[ 1 ], 'expected email to be second question in form'

	# TODO fix firefox native events issue OR put in manual review date and check date <= 6 weeks from today (put tolerance in env.rb)
	# emailQuestion.drag_and_drop_by 0, -50
	emailQuestion.drag_and_drop_on nameQuestion
	# @browser.driver.action.drag_and_drop( emailQuestion.wd, nameQuestion.wd ).perform

	# http://stackoverflow.com/questions/6503704/is-drag-and-drop-possible-in-watir-webdriver
	# messageQuestion.fire_event 'mousedown'
	# @browser.driver.action.click_and_hold( messageQuestion.wd ).perform

	# sleep 2
	# @browser.driver.action.move_to( nameQuestion.wd ).perform

	# sleep 2
	# messageQuestion.fire_event 'mouseup'

end


Then /the 'email question' should be 'first in the form'/ do
	assert_equal 'Email', @browser.ol( :class => 'questions' ).li.text, 'expected email to be first question in form'
	assert_equal 'Name', @browser.ol( :class => 'questions' ).lis[ 1 ].text, 'expected name to be second question in form'
end
