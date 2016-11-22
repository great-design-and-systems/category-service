import CategoryService from './categories';
import {
  GDSDomainDTO,
  GDSDomainPaginateHelper
} from 'gds-config';

const API = process.env.API_NAME || '/api/category/';

export default class CategoryResource {
  constructor(app) {
    const categoryService = new CategoryService();

    app.get('/', (req, res) => {
      const domain = new GDSDomainDTO();
      domain.addPost('createCategory', 'http://' + req.headers.host + API + 'create-category');
      domain.addGet('getCategoryList', 'http://' + req.headers.host + API + 'get-category-list');
      domain.addGet('getCategoryById', 'http://' + req.headers.host + API + 'get-category-by-id/:categoryId');
      domain.addPut('updateCategory', 'http://' + req.headers.host + API + 'update-category/:categoryId');
      domain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/:categoryId');
      domain.addGet('getCategoryByName', 'http://' + req.headers.host + API + 'get-category-by-name/:categoryName');
      domain.addPost('createField', 'http://' + req.headers.host + API + 'create-field');
      domain.addPut('updateField', 'http://' + req.headers.host + API + 'update-field/:fieldId');
      domain.addDelete('removeField', 'http://' + req.headers.host + API + 'remove-field/:fieldId');
      domain.addGet('getFieldsByCategoryId', 'http://' + req.headers.host + API + 'get-fields-by-category-id/:categoryId');
      res.status(200).send(domain);
    });

    app.post(API + 'create-category', (req, res) => {
      categoryService.createCategory(req.body, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const createDomain = new GDSDomainDTO('CREATE-CATEGORY', 'Category has been created');
          createDomain.addGet('getCategoryById', 'http://' + req.headers.host + API + 'get-category-by-id/' + result._id);
          createDomain.addPut('updateCategory', 'http://' + req.headers.host + API + 'update-category/' + result._id);
          createDomain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/' + result._id);
          createDomain.addGet('getCategoryByName', 'http://' + req.headers.host + API + 'get-category-by-name/' + result.name);
          createDomain.addGet('getFieldsByCategoryId', 'http://' + req.headers.host + API + 'get-fields-by-category-id/' + result._id);
          res.status(200).send(createDomain);
        }
      });
    });

    app.get(API + 'get-category-list', (req, res) => {
      categoryService.getCategoryList(new GDSDomainPaginateHelper(req),
        (err, result) => {
          if (err) {
            res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
              err.message
            ))
          } else {
            res.status(200).send(new GDSDomainDTO('GET-CATEGORY-LIST', result));
          }
        });
    });

    app.get(API + 'get-category-by-id/:categoryId', (req, res) => {
      categoryService.getCategoryById(req.params.categoryId, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const domain = new GDSDomainDTO('GET-CATEGORY-BY-ID', result);
          domain.addPut('updateCategory', 'http://' + req.headers.host + API + 'update-category/' + result.category._id);
          domain.addDelete('removeCategory', 'http://' + req.headers.host + API + 'remove-category/' + result.category._id);
          res.status(200).send(domain);
        }
      });
    });

    app.put(API + 'update-item/:itemId', (req, res) => {
      categoryService.updateItem(req.params.itemId, req.body, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const domain = new GDSDomainDTO('UPDATE-ITEM', 'Item has been updated');
          domain.addGet('getItemsById', 'http://' + req.headers.host + API + 'get-item-by-id/' + result._id);
          domain.addDelete('removeItem', 'http://' + req.headers.host + API + 'remove-item/' + result._id);
          res.status(200).send(domain);
        }
      });
    });

    app.delete(API + 'remove-item/:itemId', (req, res) => {
      categoryService.removeItemById(req.params.itemId, (err) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          res.status(200).send(new GDSDomainDTO('REMOVE-ITEM', 'Item has been removed'));
        }
      });
    });

    app.get(API + 'get-item-by-name/:itemName', (req, res) => {
      categoryService.getItemByName(req.params.itemName, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const domain = new GDSDomainDTO('GET-ITEM-BY-NAME', result);
          domain.addPut('updateItem', 'http://' + req.headers.host + API + 'update-item/' + result._id);
          domain.addDelete('removeItem', 'http://' + req.headers.host + API + 'remove-item/' + result._id);
          res.status(200).send(domain);
        }
      });
    });

  }
}