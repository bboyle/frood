require 'watir-webdriver'

# PORTABLE_APPS = 'C:\PortableApps'
# Selenium::WebDriver::Firefox.path = PORTABLE_APPS + '\FirefoxPortable\FirefoxPortable.exe'
# Selenium::WebDriver::Chrome.path = PORTABLE_APPS + '\GoogleChromePortable\GoogleChromePortable.exe'

browser = Watir::Browser.new
 
Before do
  @browser = browser
end
 
at_exit do
  browser.close
end
