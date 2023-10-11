import mongoose from "mongoose";

const userIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];

export const users = [
  {
    _id: userIds[0],
    firstName: "test",
    lastName: "me",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    visitors: [],
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    visitors: [],
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];

const visitorIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const visitors = [
  {
    _id: visitorIds[0],
    firstName: "test",
    lastName: "me",
    barcodeId: 12345, // Add a barcode ID here
    companyName: "Sample Company", // Add a company name here
    email: "aaaaaaa@gmail.com",
    OnPremises: true, // Set OnPremises to either true or false
    ExpirationDate: new Date("2023-12-31"), // Set an expiration date
    phone: "1234567890", // Add a phone number here
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: visitorIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    barcodeId: 54321, // Add a barcode ID here
    companyName: "Another Company", // Add a company name here
    email: "thataaa@gmail.com",
    OnPremises: false, // Set OnPremises to either true or false
    ExpirationDate: new Date("2023-11-30"), // Set an expiration date
    phone: "9876543210", // Add a phone number here
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];
