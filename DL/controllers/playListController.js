require("../db").connect();

const { PlayList } = require("../models/indexModels");

const create = async ({ playlistName, user }) => {
  return await PlayList.create({ playlistName, user });
};
const findOne = async (filter) => {
  return await PlayList.findOne(filter);
};
const findByID = async (id) => {
  return await PlayList.findById(id);
};

const findOneAndPopulate = async (filter, fieldToPopulate) => {
  return await PlayList.findOne(filter).populate(fieldToPopulate);
};

const findAll = async (filter) => {
  return await PlayList.find(filter);
};
const findAllAndPopulate = async (filter, fieldToPopulate) => {
  return await PlayList.find(filter).populate(fieldToPopulate);
};

const findAllAndPopulateAndSelect = async (
  filter,
  fieldToPopulate,
  selectedFeilds
) => {
  return await PlayList.find(filter)
    .populate(fieldToPopulate)
    .select(selectedFeilds);
};

const updateOne = async (filter, newValue) => {
  return PlayList.findOneAndUpdate(filter, newValue, { new: true });
};

const deleteOne = async (filter) => {
  return PlayList.findOneAndDelete(filter);
};

module.exports = {
  create,
  findOne,
  findByID,
  findOneAndPopulate,
  findAllAndPopulateAndSelect,
  findAll,
  findAllAndPopulate,
  updateOne,
  deleteOne,
};
