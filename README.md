API engine

Postman testing
1. GET http://localhost:3000/api/resources 
output: 
[
    {
        "id": 1,
        "name": "Notebook",
        "category": "School"
    },
    {
        "id": 2,
        "name": "Laptop",
        "category": "Electronics"
    }
]

2.  GET http://localhost:3000/api/resources/1 
output: 
{
    "id": 1,
    "name": "Notebook",
    "category": "School"
}

3. GET http://localhost:3000/api/resources/5
output: 
{
    "message": "Resource not found"
}

4. POST http://localhost:3000/api/resources 
in body > raw , JSON:
{
  "name": "Water",
  "category": "Kitchen"
}
output:
{
    "id": 3,
    "name": "Water",
    "category": "Kitchen"
}

5. PUT http://localhost:3000/api/resources/3
in body > raw , JSON:
{
  "name": "Water Bottle",
  "category": "Kitchen"
}
output: 
{
    "id": 3,
    "name": "Water Bottle",
    "category": "Kitchen"
}

6. DELETE http://localhost:3000/api/resources/3 
output: 
{
    "message": "Resource deleted",
    "resource": {
        "id": 3,
        "name": "Water Bottle",
        "category": "Kitchen"
    }
}