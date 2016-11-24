import CreateCategory from '../control/category/create-category';
import CreateField from '../control/field/create-field';
import GetCategoryList from '../control/category/get-category-list';
import GetCategoryById from '../control/category/get-category-by-id';
import GetFieldsByCategoryId from '../control/field/get-fields-by-category-id';
import UpdateCategory from '../control/category/update-category';
import RemoveCategoryById from '../control/category/remove-category-by-id';
import RemoveFieldsByCategoryId from '../control/field/remove-fields-by-category-id';
import GetCategoryByName from '../control/category/get-category-by-name';
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
            callback(null, { category, fields });
          }
        });
      }
    });
  }
  updateCategory(categoryId, category, callback) {
    new UpdateCategory(categoryId, category, callback);
  }
  removeCategoryById(categoryId, callback) {
    new RemoveCategoryById(categoryId, (err) => {
      if (err) {
        callback(err);
      } else {
        new RemoveFieldsByCategoryId(categoryId, callback);
      }
    });
  }

  getCategoryByName(categoryName, callback) {
    new GetCategoryByName(categoryName, (err, category) => {
      if (err || !category) {
        callback(err);
      } else {
        new GetFieldsByCategoryId(category._id, (err, fields) => {
          if (err) {
            callback(err);
          } else {
            callback(null, { category, fields });
          }
        });
      }
    });
  }
}