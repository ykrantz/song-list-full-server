require("../db").connect();

// TODO: add populate +find and delete by id

const { Room } = require("../models/indexModels");

const createRoom = async (name, maxOfPeople, hourCost) => {
  return await Room.create({ name, maxOfPeople, hourCost });
};
const findOneRoom = async (filter) => {
  return await Room.findOne(filter);
};
const findRoomByID = async (id) => {
  return await Room.findById(id);
};

const findAllRoom = async (filter) => {
  return await Room.find(filter);
};

const updateRoom = async (filter, newValue) => {
  return Room.findOneAndUpdate(filter, newValue, { new: true });
};

const deleteRoom = async (filter) => {
  return Room.findOneAndDelete(filter);
};

module.exports = {
  createRoom,
  findOneRoom,
  findRoomByID,
  findAllRoom,
  updateRoom,
  deleteRoom,
};
