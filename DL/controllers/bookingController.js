require("../db").connect();
const { Booking } = require("../models/indexModels");

const createBooking = async ({
  meetingDate,
  startTime,
  endTime,
  room,
  user,
  logDate,
  payMethod,
  calenderLink,
  purchaseCost,
  payedBy: { monthly, credit, purchase },
}) => {
  return await Booking.create({
    meetingDate,
    startTime,
    endTime,
    room,
    user,
    logDate,
    payMethod,
    calenderLink,
    purchaseCost,
    payedBy: {
      monthly,
      credit,
      purchase,
    },
  });
};

const findOneBooking = async (filter) => {
  return await Booking.findOne(filter);
};

const findOneBookingAndPopulate = async (filter, fieldToPopulate) => {
  return await Booking.findOne(filter).populate(fieldToPopulate);
};
const findBookingByID = async (id) => {
  return await Booking.findById(id);
};

const findAllBooking = async (filter) => {
  return await Booking.find(filter);
};

const findAllBookingAndPopulate = async (filter, fieldToPopulate) => {
  return await Booking.find(filter).populate(fieldToPopulate);
};

const updateBooking = async (filter, newValue) => {
  return Booking.findOneAndUpdate(filter, newValue, { new: true });
};

const deleteBooking = async (filter) => {
  return Booking.findOneAndDelete(filter);
};

module.exports = {
  createBooking,
  findOneBooking,
  findBookingByID,
  findAllBooking,
  findOneBookingAndPopulate,
  findAllBookingAndPopulate,
  updateBooking,
  deleteBooking,
};

//
// tests:

const temp1 = {
  meetingDate: 1645136502241,
  startTime: 1645136502241,
  endTime: 1645136592241,
  room: "620ec03e326f9e45a5b580aa",
  user: "620ec63edfa0706358507412",
  logDate: 1645136502241,
  //   payMethod: { type: mongoose.SchemaTypes.ObjectId, ref: "PayMethod" },
  calenderLink: "URL",
  purchaseCost: 3,
  payedBy: {
    monthly: 4,
    credit: 5,
    purchase: 6,
  },
};

const temp2 = {
  meetingDate: 1645136502241,
  startTime: 1645136502241,
  endTime: 1645136592241,
  room: "620ec04f466f8889b2d95eec",
  user: "620ec657027344e5353f7b87",
  logDate: 1645136502241,
  //   payMethod: { type: mongoose.SchemaTypes.ObjectId, ref: "PayMethod" },
  calenderLink: "URL222",
  purchaseCost: 23,
  payedBy: {
    monthly: 24,
    credit: 25,
    purchase: 26,
  },
};

const temp3 = { room: "620ec04f466f8889b2d95eec" };
const popString = "user room";
const temp4 = { room: "620ec03e326f9e45a5b580aa" };
const temp5 = { room: "620ec04f466f8889b2d95eec" };

async function test1() {
  console.log("@@@");
  const ans1 = await createBooking(temp1);
  const ans2 = await createBooking(temp2);
  console.log({ ans1 }, { ans2 });
}

console.log("^^^^");
// test1();

async function test2() {
  const ans2 = await findOneBooking(temp3);
  const ans2b = await findAllBooking(temp4);

  console.log({ ans2 }, { ans2b });
}
// test2();

async function test2B() {
  const ans2 = await findOneBookingAndPopulate(temp3, popString);
  const ans2b = await findAllBookingAndPopulate(temp4, popString);
  const ans2c = await findBookingByID("620ecbbdf476f38fe0fc9dd8");

  console.log({ ans2 }, { ans2b }, { ans2c });
  // console.log({ ans2 });
}

console.log("$$$");
test2B();

async function test3() {
  const ans3 = await updateBooking(temp3, temp5);
  console.log({ ans4 });
}

console.log("@@@@");
// test3();

async function test4() {
  const ans4 = await deleteBooking(temp5);
  console.log({ ans4 });
}

console.log("&&&&");
// test4();
