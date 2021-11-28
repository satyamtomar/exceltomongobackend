// const ErrorHander = require("../middleware/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/dataModel");
const async = require("async");
var validator = require("validator");

// Add Users

const addUser = async (val, cb) => {
  if (val.Email !== undefined || val["Name of the Candidate"] !== undefined) {
    const obj = {
      name: val["Name of the Candidate"],
      email: val.Email,
      mobile: val["Mobile No."],
      dob: val["Date of Birth"],
      experience: val["Work Experience"],
      resume: val["Resume Title"],
      location: val["Current Location"],
      address: val["Postal Address"],
      currentEmployer: val["Current Employer"],
      currentDesignation: val["Current Designation"],
    };

    if (!validator.isEmail(val.Email)) {
      return cb(null);
    }
    try {
      const user = await User.findOne({ email: val.Email });
      if (!user) {
        await User.create(obj);
      }
    } catch (err) {
      console.log(err, "  error");
    }
  }
  cb(null);
};
exports.uploadFile = catchAsyncErrors(async (req, res, next) => {
  var XLSX = require("xlsx");
  var workbook = XLSX.readFile(req.file.path);
  var sheet_name_list = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
    raw: false,
  });
  async.eachSeries(
    data,
    (val, next) => {
      addUser(val, next);
    },
    (err) => {
      console.log("finished");
    }
  );
  return res.status(200).send(data);
});

exports.getData = catchAsyncErrors(async(req,res,next)=>{
  const data = await User.find({});
  return res.status(201).send(data);
})
