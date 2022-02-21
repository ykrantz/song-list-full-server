require("../db").connect();

const { Song } = require("../models/indexModels");

const create = async ({ title, id, src, img, artist, provider }) => {
  return await Song.create({ title, id, src, img, artist, provider });
};
const findOne = async (filter) => {
  return await Song.findOne(filter);
};

const findOneAndSelect = async (filter, selectedFeilds) => {
  return await Song.findOne(filter).select(selectedFeilds);
};
const findByID = async (id) => {
  return await Song.findById(id);
};

const findAll = async (filter) => {
  return await Song.find(filter);
};

const updateOne = async (filter, newValue) => {
  return Song.findOneAndUpdate(filter, newValue, { new: true });
};

const deleteOne = async (filter) => {
  return Song.findOneAndDelete(filter);
};

module.exports = {
  create,
  findOne,
  findByID,
  findOneAndSelect,
  findAll,

  updateOne,
  deleteOne,
};
