from selenium import webdriver
import pymongo
import ssl
from pymongo import MongoClient


path_to_chromedriver = './chromedriver'
browser = webdriver.Chrome(executable_path = path_to_chromedriver)

url = 'http://www.catalog.gatech.edu/coursesaz/'
browser.get(url)





client = MongoClient('mongodb+srv://admin:password978@openeval-mvp-sample-cluster-ohzcj.mongodb.net/test?retryWrites=true', ssl=True, ssl_cert_reqs=ssl.CERT_NONE)

# Get the sampleDB database
db = client.database
collection = db.courses


library = browser.find_elements_by_xpath('//div[@id="atozindex"]/ul/li/a')
#print(library.get_attribute('href'))

listLinks = []
for item in library:
	listLinks.append(item.get_attribute('href'))

for item in listLinks:
	#print item.get_attribute('href')
	browser.get(item)
	titles = browser.find_elements_by_xpath('//p[@class="courseblocktitle"]')
	for title in titles:
		courseNumber =  title.text.split('.')[0] 
		courseTitle = title.text.split('.')[1]
		courseInfo = {"courseNumber" : courseNumber,
						"courseName" : courseTitle}
		postid = collection.insert_one(courseInfo)
		print(courseInfo)





