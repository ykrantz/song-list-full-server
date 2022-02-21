const { User } = require("../models/indexModels");

const create = async ({ username, password }) => {
  return await User.create({
    username,
    password,
  });
};
const findOne = async (filter) => {
  return await User.findOne(filter);
};

const findOneAndSelect = async (filter, selectedFeilds) => {
  return await User.findOne(filter).select(selectedFeilds);
};
const findById = async (id) => {
  return await User.findById(id);
};
const findAll = async (filter) => {
  return await User.find(filter);
};

const updateOne = async (filter, newValue) => {
  return User.findOneAndUpdate(filter, newValue, { new: true });
};

const deleteOne = async (filter) => {
  return User.findOneAndDelete(filter);
};

module.exports = {
  create,
  findOne,
  findOneAndSelect,
  findById,
  findAll,
  updateOne,
  deleteOne,
};
