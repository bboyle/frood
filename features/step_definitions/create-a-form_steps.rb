# steps


Given /I have access to the form builder/ do
	# open the form builder
	@browser.goto 'http://toolbox.ssq.qld.gov.au/form-builder/1.0-beta/'
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
	@browser.label( :text => "Your name" ).exists? or fail "Your name question missing"
	@browser.label( :text => "Your email" ).exists? or fail "Your email question missing"

end
