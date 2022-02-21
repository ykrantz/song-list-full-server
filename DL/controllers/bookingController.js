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
