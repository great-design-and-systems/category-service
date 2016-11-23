# category-service

## createCategory
### request json format
{ 
    "name" : "Category Name", 
    "fields" : [ 
        { "name" : "fieldName1", "fieldType" : "Number", "isFilter" : true }, 
        { "name" : "fieldName2", "fieldType" : "Text", "isFilter" : false }, 
        { "name" : "fieldName3", "fieldType" : "Date", "isFilter" : true } 
    ] 
} 

## getCategoryById
### response json format
{ 
    "category": { 
      "_id": "583470664afee0063eb60c6f", 
      "name": "Category Name 2", 
      "__v": 0, 
      "createdOn": "2016-11-22T16:20:54.808Z" 
    }, 
    "fields": [ 
      { 
        "_id": "583470674afee0063eb60c70", 
        "name": "fieldName1", 
        "fieldType": "Number", 
        "categoryId": "583470664afee0063eb60c6f", 
        "__v": 0, 
        "createdOn": "2016-11-22T16:20:55.041Z", 
        "isFilter": true 
      },
      {
        "_id": "583470674afee0063eb60c71", 
        "name": "fieldName2", 
        "fieldType": "Text", 
        "categoryId": "583470664afee0063eb60c6f", 
        "__v": 0, 
        "createdOn": "2016-11-22T16:20:55.042Z", 
        "isFilter": false 
      }, 
      { 
        "_id": "583470674afee0063eb60c72", 
        "name": "fieldName3", 
        "fieldType": "Date", 
        "categoryId": "583470664afee0063eb60c6f", 
        "__v": 0, 
        "createdOn": "2016-11-22T16:20:55.043Z", 
        "isFilter": true 
      } 
    ] 
  } 