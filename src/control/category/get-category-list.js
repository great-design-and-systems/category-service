import FieldModel from '../../entity/category';
export default class GetCategoryList {
  constructor(paginate, callback) {
    FieldModel.paginate({}, paginate, (err, result) => {
      if (err) {
        global.gdsLogger.logError(err);
        callback({
          message: 'Failed getting categories'
        });
      } else {
        callback(undefined, result);
      }
    });
  }
}