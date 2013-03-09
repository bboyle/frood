# steps


Given /I have access to the form builder/ do
	# open the form builder
	@browser.goto 'http://toolbox.ssq.qld.gov.au/form-builder/1.0-beta/'

	assert @browser.title.start_with? "Form builder", "Form builder page did not load"
end


When /I list my questions/ do
	@browser.button( :value => "new form" ).click
	Watir::Wait.until { @browser.text.include? "List your questions below" }

	# Your name
	# Your email

	@browser.send_keys "Your name", :enter, "Your email", :enter

	@browser.img( :alt => 'Close lightbox' ).click
end


Then /I should see my form/ do

	Watir::Wait.until { @browser.text.include? "Your name" }

	# form contains 2 questions
	assert @browser.label( :for => "your-name" ).exists?, 'Your name question missing'
	assert @browser.label( :for => "your-email" ).exists?, 'Your email question missing'

end
