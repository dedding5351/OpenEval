
import pymongo
import ssl
from pymongo import MongoClient



client = MongoClient('mongodb+srv://admin:password978@openeval-mvp-sample-cluster-ohzcj.mongodb.net/test?retryWrites=true', ssl=True, ssl_cert_reqs=ssl.CERT_NONE)

# Get the sampleDB database
db = client.database
collection = db.courses


for item in collection.find():
	print(item['courseNumber'])