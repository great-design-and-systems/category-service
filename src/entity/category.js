import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required.'],
    unique: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});
CategorySchema.plugin(mongoosePaginate);

const FieldModel = mongoose.model('category', CategorySchema);

export default FieldModel;