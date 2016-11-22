import FieldModel from '../../entity/category';
export default class CreateCategory {
    constructor(categoryName, callback) {
        FieldModel.create({
            name: categoryName
        }, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed saving category'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}