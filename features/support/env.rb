require 'watir-webdriver'

# PORTABLE_APPS = 'C:\PortableApps'
# Selenium::WebDriver::Firefox.path = PORTABLE_APPS + '\FirefoxPortable\FirefoxPortable.exe'
# Selenium::WebDriver::Chrome.path = PORTABLE_APPS + '\GoogleChromePortable\GoogleChromePortable.exe'

profile = Selenium::WebDriver::Firefox::Profile.new
profile.native_events = true
caps = Selenium::WebDriver::Remote::Capabilities.firefox :firefox_profile => profile
firefox = Watir::Browser.new :firefox, :desired_capabilities => caps

# ie = Watir::Browser.new :ie
# chrome = Watir::Browser.new :chrome


Before do
	@browser = firefox
end
 
After do |scenario|
  browser.screenshot.save 'features/screenshot.png'
  embed 'screenshot.png', 'image/png'
end

at_exit do
	firefox.close
end
