require 'watir-webdriver'

# PORTABLE_APPS = 'C:\PortableApps'
# Selenium::WebDriver::Firefox.path = PORTABLE_APPS + '\FirefoxPortable\FirefoxPortable.exe'
# Selenium::WebDriver::Chrome.path = PORTABLE_APPS + '\GoogleChromePortable\GoogleChromePortable.exe'

profile = Selenium::WebDriver::Firefox::Profile.new
profile.native_events = false
browser = Watir::Browser.new :firefox, :profile => profile
#browser = Watir::Browser.new :chrome


Before do
	@browser = browser
end
 
at_exit do
	browser.close
end
