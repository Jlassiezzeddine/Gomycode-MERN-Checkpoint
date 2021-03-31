const User = require("../Models/User");

const get_userList = (req, res) => {
  User.find({}, (err, data) => {
    if (err) console.log(err);
    else res.status(200).json(data);
  });
};

const add_user = (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
  });
  newUser.save();
  res.send(newUser);
};

const edit_user = async (req, res) => {
  let toEdit = req.params.id;
  const { firstName, lastName, email, phone } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: toEdit },
      { $set: { firstName, lastName, email, phone } }
    );
    res.status(200).send(`user ${toEdit} has been updated`);
  } catch (error) {
    console.log(error);
  }
};

const delete_user = async (req, res) => {
  let toDelete = req.params.id;
  try {
    await User.findOneAndDelete({ _id: toDelete });
    res.status(200).end(`user ${toDelete} has been Deleted`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  get_userList,
  add_user,
  edit_user,
  delete_user,
};
