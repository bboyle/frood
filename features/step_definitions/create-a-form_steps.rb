# steps


Given /I have access to the form builder/ do
	# open the form builder
	@browser.goto 'http://localhost:9009/frood.html'

	assert @browser.title.start_with? "Frood", "web page did not load"
end


When /I list my questions/ do
	@browser.button( :value => "New form" ).click
	Watir::Wait.until { @browser.text.include? "List your questions below" }

	# Your name
	# Your email

	@browser.send_keys "Your name", :enter, "Your email", :enter

	@browser.button( :value => 'Create form' ).click
end


Then /I should see my form/ do

	Watir::Wait.until { @browser.text.include? "Your name" }

	# form contains 2 questions
	assert @browser.label( :for => "your-name" ).exists?, 'Your name question missing'
	assert @browser.label( :for => "your-email" ).exists?, 'Your email question missing'

end
