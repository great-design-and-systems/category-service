import DynamicCategoryTable from '../control/dynamic/dynamic-category-table';
export default class DynamicService {
    constructor() {
        this.dynamicCategoryTable = new DynamicCategoryTable();
    }

    createCategoryTable(data, callback) {
        const Model = this.dynamicCategoryTable.createModelForName(data.name);
        console.log(data.content);
        const model = new Model(data.content);
        model.save((err, result, numAffected) => {
            if (err) {
                callback(err);
            } else {
                console.log(result);
                callback();
            }
        });
    }
}