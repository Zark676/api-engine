API engine

applications used:
VScode
Node.js
Express.js
MongoDB
Postman

How to start:

bash: npm install
create a .env file with:
PORT=300
MONGO_URI=(enter your mongo uri here)

bash: npm start

how to use:

get all resources:
GET /api/resources

get resource by id:
GET /api/resources/:id

create resource:
POST /api/resources

update resource:
PUT /api/resources/:id

delete resourse:
DELETE /api/resources/:id

example resource:
{
  "name": "Notebook",
  "category": "School"
}

Both name and category must be defined

