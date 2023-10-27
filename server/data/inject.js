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
    review: "this is a test review about this amazing product",
    picturePath:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "$2b$10$asddfsa//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    visitors: [],
    review: "I'm very satisfied with this product. It's great!",
    createdAt: 1115211423, // You may want to change the timestamp
    updatedAt: 1115211423,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: "Alice",
    lastName: "Johnson",
    email: "alicejohnson@gmail.com",
    password: "$2b$10$asdasd//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    visitors: [],
    review: "This product exceeded my expectations. Highly recommended!",
    createdAt: 1115211424, // Change the timestamp
    updatedAt: 1115211424,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: "Sarah",
    lastName: "Smith",
    email: "sarahsmith@gmail.com",
    password: "$2b$10$asddsfas//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    visitors: [],
    review: "A must-have product. I can't imagine my life without it!",
    createdAt: 1115211425, // Change the timestamp
    updatedAt: 1115211425,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: "Michael",
    lastName: "Brown",
    email: "michaelbrown@gmail.com",
    password: "$2b$10$asddasfsa//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    visitors: [],
    review: "Great quality and fantastic service. I'm a happy customer!",
    createdAt: 1115211426, // Change the timestamp
    updatedAt: 1115211426,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: "Emily",
    lastName: "Williams",
    email: "emilywilliams@gmail.com",
    password: "$2b$10$asddfgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    visitors: [],
    review: "I love this product! It's a game-changer for me.",
    createdAt: 1115211427, // Change the timestamp
    updatedAt: 1115211427,
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    firstName: "David",
    lastName: "Johnson",
    email: "davidjohnson@gmail.com",
    password: "$2b$10$asddfgsafasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    visitors: [],
    review: "Outstanding product. I'm completely satisfied!",
    createdAt: 1115211428, // Change the timestamp
    updatedAt: 1115211428,
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
