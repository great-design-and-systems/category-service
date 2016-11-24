import mongoose from 'mongoose';
export default class DynamicCategoryTable {
    constructor() {
        this.establishedModels = {};
    }

    createModelForName(name) {
        if (!(name in this.establishedModels)) {
            const Any = new mongoose.Schema({any: mongoose.Schema.Types.Mixed});
            this.establishedModels[name] = mongoose.model(name, Any);
        }
        return this.establishedModels[name];
    }
}