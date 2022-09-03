const dataPath = "./TestData.json";
const authPath = "./AuthData.json";
const fs = require("fs");
const uniqid = require("uniqid");
const salt_round = Number(process.env.salt_rounds);
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// recursive function random the passing array the return the first 10
// objects in the random array and check if it have at least one of all
// the types
const randomArr = (arr) => {
  const list = arr.sort(() => 0.5 - Math.random()).slice(0, 10);
  if (
    list.some((e) => e.pos === "adverb") &&
    list.some((e) => e.pos === "noun") &&
    list.some((e) => e.pos === "adjective") &&
    list.some((e) => e.pos === "verb")
  ) {
    return list;
  }

  return randomArr(arr);
};

const getWords = async (req, res) => {
  const jsonData = await fs.readFileSync(dataPath); // read the data from json file
  const data = JSON.parse(jsonData).wordList; // parse the data
  const wordList = randomArr(data); // get random array

  res.status(200).json(wordList);
};

const getRank = async (req, res) => {
  const jsonData = await fs.readFileSync(dataPath);
  const data = JSON.parse(jsonData).scoresList;
  const { score } = req.body; // get the score from requst body
  let count = 0;
  data.map((e) => {
    // count scores which are the actual score
    if (score > e) {
      count++;
    }
  });

  const rank = (count / data.length) * 100; // get the rank of the score

  res.status(200).json({ rank: Math.round(100 * rank) / 100 });
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;  // get data from request body

  const jsonData = await fs.readFileSync(authPath);   // read data from json file 

  const dataObj = JSON.parse(jsonData);

  const user = dataObj.find((user) => user.email === email);  // find if user exist

  if (user) {
    return res.status(400).send({
      message: "User Already Exist",
    });
  }

  let hashedpassword = await bcrypt.hash(password, salt_round);  // hashing the password of the user
  dataObj.push({
    id: uniqid(),
    firstName,
    lastName,
    email,
    hashedpassword,
  });

  const dataContent = JSON.stringify(dataObj);

  const data = await fs.writeFileSync(authPath, dataContent); // rewrite the json file with the new data

  return res.status(200).json("user added");
};

///login function

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const jsonData = await fs.readFileSync(authPath);

  const dataObj = JSON.parse(jsonData);

  const user = dataObj.find((user) => user.email === email);  //find the user data

  if (user) {
    const comparePassword = await bcrypt.compare(password, user.hashedpassword);  // check if the password is correct 

    if (!comparePassword) {
      return res.status(404).send({
        message: "Invalid email or password",
      });
    }
    return res.json(user);
  } else {
    return res.status(400).send({
      message: "user not found",
    });
  }
};

module.exports = { getWords, getRank, register, logIn };
