# steps


Given /I am editing the 'simple contact form'/ do
	# open the form builder
	@browser.goto 'http://localhost:9009/test/fixture/form-contact-simple.html'

	assert @browser.title.start_with? 'Simple contact form', 'web page did not load'
	assert @browser.input( :id => 'email' ).exists?, 'email field is missing'
end
