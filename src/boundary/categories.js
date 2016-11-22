import CreateCategory from '../control/category/create-category';
import CreateField from '../control/field/create-field';
import GetCategoryList from '../control/category/get-category-list';
import GetCategoryById from '../control/category/get-category-by-id';
import GetFieldsByCategoryId from '../control/field/get-fields-by-category-id';
// import UpdateItem from '../control/item/update-item';
// import RemoveItemById from '../control/item/remove-item-by-id';
// import GetItemByName from '../control/item/get-item-by-name';
export default class CategoryService {

  createCategory(data, callback) {
    new CreateCategory(data.name, (err, category) => {
      if (err) {
        callback(err);
      } else {
        if (data.fields) {
          for (var field of data.fields) {
            new CreateField(category._id, field, callback);
          }
        } else {
          // fields is not mandatory
          callback(null, category);
        }
      }
    });
  }

  getCategoryList(paginate, callback) {
    new GetCategoryList(paginate, callback);
  }
  getCategoryById(categoryId, callback) {
    new GetCategoryById(categoryId, (err, category) => {
      if (err || !category) {
        callback(err);
      } else {
        new GetFieldsByCategoryId(categoryId, (err, fields) => {
          if (err) {
            callback(err);
          } else {
            callback(null, {category, fields});
          }
        });
      }
    });
  }
  // updateItem(itemId, item, callback) {
  //   new UpdateItem(itemId, item, callback);
  // }
  // removeItemById(itemId, callback) {
  //   new RemoveItemById(itemId, callback);
  // }
  // getItemByName(itemName, callback) {
  //   new GetItemByName(itemName, callback);
  // }
}