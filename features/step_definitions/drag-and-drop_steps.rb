# steps


When /I drag the 'email question' to 'the top'/ do
	# TODO calculate drag distance from top of form and Y-coordinate of field
	nameQuestion = @browser.input( :id => 'name' ).parent
	emailQuestion = @browser.input( :id => 'email' ).parent
	assert_equal nameQuestion, @browser.ol( :class => 'questions' ).li, 'expected name to be first question in form'

	# TODO fix firefox native events issue OR put in manual review date and check date <= 6 weeks from today (put tolerance in env.rb)
	# emailQuestion.drag_and_drop_by 0, -50
	emailQuestion.drag_and_drop_on nameQuestion
	# @browser.driver.action.drag_and_drop( emailQuestion.wd, nameQuestion.wd ).perform

end


Then /the 'email question' should be 'first in the form'/ do
	assert_equal @browser.input( :id => 'email' ).parent, @browser.ol( :class => 'questions' ).li, 'expected email to be first question in form'
end
