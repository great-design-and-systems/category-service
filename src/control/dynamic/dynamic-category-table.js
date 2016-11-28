import mongoose from 'mongoose';
export default class DynamicCategoryTable {
    constructor() {
        this.establishedModels = {};
    }

    getModel(name) {
        if (!(name in this.establishedModels)) {
            const Any = new mongoose.Schema(
                { any: mongoose.Schema.Types.Mixed }, { strict: false }
            );
            this.establishedModels[name] = mongoose.model(name, Any);
        }
        return this.establishedModels[name];
    }

    createCategoryData(categoryName, categoryData, callback) {
        let Model = this.getModel(categoryName);
        let model = Model(categoryData);
        model.save((err, result, numAffected) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed saving ' + categoryName
                });
            } else {
                callback(undefined, result);
            }
        });
    }

    getCategoryData(categoryName, query, callback) {
        let model = this.getModel(categoryName);
        model.find(query, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed getting ' + categoryName
                });
            } else {
                callback(undefined, result);
            }
        });
    }

    updateCategoryData(categoryName, categoryData, callback) {
        let model = this.getModel(categoryName);
        model.update(categoryData.query, categoryData.update, { multi: true }, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed getting ' + categoryName
                });
            } else {
                callback(undefined, result);
            }
        });
    }

    deleteCategoryData(categoryName, query, callback) {
        let model = this.getModel(categoryName);
        model.remove(query, (err) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed deleting ' + categoryName
                });
            } else {
                callback();
            }
        });
    }
}