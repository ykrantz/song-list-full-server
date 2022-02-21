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

//
// tests:

const temp1 = { name: "aaa" };
const temp2 = { name: "ccc" };
async function test1() {
  return await createRoom("aaa", 3, 4);
}

// test1();

async function test2() {
  //   await require("../db").connect();
  //   const ans = await Room.findOne({ name: "aaa" });
  //   console.log({ ans });
  //   const ans2 = await findOneRoom({ name: "aaa" });
  //   const ans3 = await findAllRoom({ name: "aaa" });
  //   console.log({ ans3 });

  //   const ans4 = await updateRoom(temp1, temp2);
  const ans5 = await deleteRoom(temp2);
  console.log({ ans5 });
  //   const ans3 = await findOneRoom("name", "aaa");
  //   console.log({ ans2 });
  //   return await findOneRoom("name", "aaa");
}

console.log("$$$");
// console.log(test1());
// test2();
// console.log(test2());
