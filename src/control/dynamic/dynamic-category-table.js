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
}