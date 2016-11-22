import FieldModel from '../../entity/category';

export default class GetCategoryById {
  constructor(categoryId, callback) {
    FieldModel.findOne({
      _id: categoryId
    }, (err, result) => {
      if (err) {
        global.gdsLogger.logError(err);
        callback({
          message: 'Failed getting category'
        });
      } else {
        callback(undefined, result);
      }
    });
  }
}