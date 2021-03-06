const moment = require('moment');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExpenseCategorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const ExpenseCategory = mongoose.model('ExpenseCategory', ExpenseCategorySchema);

module.exports = ExpenseCategory;
