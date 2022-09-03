var Request = require("request");
//const AppSettings = require('../utils/AppSettings.json');

var fetch = require("node-fetch");

module.exports.sendSignUpOTP = (req, res, next) => {
  const mobileno = req.params.mobileno;
  const otp = Math.floor(Math.random() * 88999 + 10000);

  const message =
    otp +
    " is the OTP to login to your LUMMANG account.%nPlease do not share this OTP to anyone.";
  const url =
    "https://api.textlocal.in/send/?apikey=NmQ3NTc5NTc2YzczMzE0MTZkNTk1YTYzNWE1ODQ2N2E=&sender=LUMMNG&numbers=" +
    mobileno +
    "&message=" +
    message;
  Request.get(url, (error, response, body) => {
    if (error) {
      return console.dir(error);
    } else {
      res.status(200).json({
        statusCode: 200,
        status: "success",

        status: "success",
        otp: otp,
      });
    }
  });
};

module.exports.otp = async (req, res, next) => {
  const body = { a: 1 };

  const response = await fetch("https://api.sandbox.co.in/authenticate", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "key_live_Mm2bVCg3md3slvvSW9NNQ9Reo9Z2sNsC",
      "x-api-secret": "secret_live_KdwqXSbCx8ErzwAUkw4Nr4sJOYNGw1Ar",
      "x-api-version": "1.0",
    },
  });
  const data = await response.json();
  const jwt_token = data["access_token"];

  const mresponse = await fetch(
    "https://api.sandbox.co.in/gsp/public/gstin/" + req.params.gstinno,
    {
      method: "get",

      headers: {
        "Content-Type": "application/json",
        "x-api-key": "key_live_Mm2bVCg3md3slvvSW9NNQ9Reo9Z2sNsC",
        Authorization: jwt_token,
        "x-api-version": "1.0",
        gstin: req.params.gstinno,
      },
    }
  );

  const ndata = await mresponse.json();

  res.send(ndata);
};

//account no validation

//phone no validation

module.exports.phoneno = async (req, res, next) => {
  const body = { a: 1 };

  const ifsc = req.params.ifsc;
  const account_number = req.params.account_number;
  const name = req.params.name;
  const mobile = req.params.mobile;

  const response = await fetch("https://api.sandbox.co.in/authenticate", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "key_live_Mm2bVCg3md3slvvSW9NNQ9Reo9Z2sNsC",
      "x-api-secret": "secret_live_KdwqXSbCx8ErzwAUkw4Nr4sJOYNGw1Ar",
      "x-api-version": "1.0",
    },
  });
  const data = await response.json();
  const jwt_token = data["access_token"];

  const mresponse = await fetch(
    "https://api.sandbox.co.in/bank/" +
      ifsc +
      "/accounts/" +
      account_number +
      "/verify?name=" +
      name +
      "&mobile=" +
      mobile +
      "",
    {
      method: "get",

      headers: {
        "Content-Type": "application/json",
        "x-api-key": "key_live_Mm2bVCg3md3slvvSW9NNQ9Reo9Z2sNsC",
        Authorization: jwt_token,
        "x-api-version": "1.0",
        name: req.params.name,
        mobile: req.params.mobile,
      },
    }
  );

  const ndata = await mresponse.json();

  res.send(ndata);
  const acountdetails = ndata;
  console.log(acountdetails);
};

//pincode validatiob

module.exports.validatepincode = async (req, res, next) => {
  const pincode = req.body.pincode;
  const response = await fetch(
    "https://pre-alpha.ithinklogistics.com/api_v3/pincode/check.json",
    {
      method: "post",
      body: JSON.stringify({
        data: {
          pincode: req.body.pincode,
          access_token: "5a7b40197cd919337501dd6e9a3aad9a",
          secret_key: "2b54c373427be180d1899400eeb21aab",
        },
      }),
    }
  );

  const data = await response.json();

  res.send(data);
  console.log(data);
};
