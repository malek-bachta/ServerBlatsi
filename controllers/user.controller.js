const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SchemaType } = require("mongoose");
const nodemailer = require("nodemailer");
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//GetAllUsers
const index = (req, res) => {
  User.find({})
    .sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      if (data.length == 0) {
        res.json({ message: "There is No User Yet" });
      } else res.send(data);
    });
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//Signup
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.json({ error: "please add all the feilds" });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res.json({ error: "SignUp User Exist" });
  }
  else try {
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hasedPassword,
      avatar: username,
      bio: "RandomBio //TODO",
      codeVerif: "empty",
      codeForget: "empty",
      verified: "NotYet",
    });
    user
      .save()
      .then((user) => {
        res.json({ message: "SignUp Done!" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//Login
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please provide email or password" });
  }
  User.findOne({ email: email.toLowerCase() }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const accessToken = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_Key
          );
          res.status(200).send(
            JSON.stringify({
              //200 OK
              id: savedUser._id,
              name: savedUser.username,
              email: savedUser.email,
              bio: savedUser.bio,
              avatar: savedUser.avatar,
              token: accessToken,
              role:savedUser.role,
            })
          );
        } else {
          return res.status(422).json({ error: "invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  secure: true, // use SSL
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});
const SendCodeForgot = async (req, res, next) => {
  const userMail = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!userMail) {
    res.status(202).json({
      message: "email not found",
    });
  } else {
    var RandomXCode = Math.floor(1000 + Math.random() * 9000);
    console.log(RandomXCode);
    //

    var mailOptions = {
      from: process.env.Email,
      to: req.body.email,
      text: "Forget Password?",
      subject: "Password Reset",
      html: `<!DOCTYPE html>
      <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
          <title></title>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              <o:AllowPNG/>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if !mso]>
          <!-->
          <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Alegreya" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css" />
          <!--
          <![endif]-->
          <style>
            * {
              box-sizing: border-box;
            }
      
            body {
              margin: 0;
              padding: 0;
            }
      
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
      
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
      
            p {
              line-height: inherit
            }
      
            .desktop_hide,
            .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
            }
      
            @media (max-width:520px) {
              .desktop_hide table.icons-inner {
                display: inline-block !important;
              }
      
              .icons-inner {
                text-align: center;
              }
      
              .icons-inner td {
                margin: 0 auto;
              }
      
              .image_block img.big,
              .row-content {
                width: 100% !important;
              }
      
              .mobile_hide {
                display: none;
              }
      
              .stack .column {
                width: 100%;
                display: block;
              }
      
              .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
              }
      
              .desktop_hide,
              .desktop_hide table {
                display: table !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
        <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
            <tbody>
              <tr>
                <td>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                  <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                    <tr>
                                      <td class="pad" style="padding-bottom:10px;width:100%;padding-right:0px;padding-left:0px;">
                                        <br>
                                        <br>
                                        <br>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 15px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                  <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                    <tr>
                                      <td class="pad" style="padding-bottom:5px;padding-left:5px;padding-right:5px;width:100%;">
                                        <div align="center" class="alignment" style="line-height:10px">
                                          <img alt="reset-password" class="big" src="https://i.ibb.co/9g5fBQW/gif-resetpass.gif" style="display: block; height: auto; border: 0; width: 350px; max-width: 100%;" title="reset-password" width="350" />
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                    <tr>
                                      <td class="pad" style="text-align:center;width:100%;">
                                        <h1 style="margin: 0; color: #393d47; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                          <strong>Forgot your password?</strong>
                                        </h1>
                                      </td>
                                    </tr>
                                  </table>
                                  <table border="0" cellpadding="10" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                    <tr>
                                      <td class="pad">
                                        <div style="font-family: Tahoma, Verdana, sans-serif">
                                          <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;">
                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">
                                              <span style="font-size:14px;">
                                                <span style="">Not to worry, we got you! </span>
                                                <span style="">Let???s get you a new password.</span>
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table border="0" cellpadding="15" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                    <tr>
                                      <td class="pad">
                                        <div align="center" class="alignment">
                                          <!--[if mso]>
                                                <v:roundrect
                                                  xmlns:v="urn:schemas-microsoft-com:vml"
                                                  xmlns:w="urn:schemas-microsoft-com:office:word" href="www.yourwebsite.com" style="height:58px;width:272px;v-text-anchor:middle;" arcsize="35%" strokeweight="0.75pt" strokecolor="#FFC727" fillcolor="#ffc727">
                                                  <w:anchorlock/>
                                                  <v:textbox inset="0px,0px,0px,0px">
                                                    <center style="color:#393d47; font-family:Tahoma, Verdana, sans-serif; font-size:18px">
                                                      <![endif]-->
                                          <a style="text-decoration:none;display:inline-block;color:#393d47;background-color:#ffc727;border-radius:20px;width:auto;border-top:1px solid #FFC727;font-weight:undefined;border-right:1px solid #FFC727;border-bottom:1px solid #FFC727;border-left:1px solid #FFC727;padding-top:10px;padding-bottom:10px;font-family:Tahoma, Verdana, Segoe, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank">
                                            <span style="padding-left:50px;padding-right:50px;font-size:18px;display:inline-block;letter-spacing:normal;">
                                              <span style="word-break: break-word;">
                                                <span data-mce-style="" style="line-height: 36px;">
                                                  <strong>${RandomXCode}</strong>
                                                </span>
                                              </span>
                                            </span>
                                          </a>
                                          <!--[if mso]>
                                                    </center>
                                                  </v:textbox>
                                                </v:roundrect>
                                                <![endif]-->
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                    <tr>
                                      <td class="pad" style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                        <div style="font-family: Tahoma, Verdana, sans-serif">
                                          <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;">
                                            <p style="margin: 0; mso-line-height-alt: 19.5px;">
                                              <span style="font-size:13px;">If you didn???t request to change your password, simply ignore this email.</span>
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                  <table border="0" cellpadding="15" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                    <tr>
                                      <td class="pad">
                                        <div style="font-family: Tahoma, Verdana, sans-serif">
                                          <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2;">
                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                              <span style="font-size:10px;">If you continue to have problems</span>
                                              <br />
                                              <span style="font-size:10px;">please feel free to contact us at Blasti@gmail.com. </span>
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                  <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                    <tr>
                                      <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                        <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                          <tr>
                                            <td class="alignment" style="vertical-align: middle; text-align: center;">
                                              <!--[if vml]>
                                                    <table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                      <![endif]-->
                                              <!--[if !vml]>
                                                      <!-->
                                              <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
                                                <!--
                                                        <![endif]-->
                                                <tr></tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- End -->
        </body>
      </html>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json({ message: "error sending" });
        console.log(error);
      } else {
        res.status(205).json({
          codeForget: RandomXCode,
        });
        User.findOneAndUpdate(
          { email: req.body.email },
          { codeForget: RandomXCode },
          { new: true }
        )
          .then((user) => {
            //console.log(user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const VerifCodeForgot = async (req, res, next) => {
  const { email, codeForget } = req.body;
  if (!email || !codeForget) {
    return res.status(422).json({ error: "Something is missing" });
  } else {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body.email);
    console.log("Code enter by the User ==> " + req.body.codeForget);
    console.log("Code ons the Database ==> " + user.codeForget);
    ///
    if (req.body.codeForget == user.codeForget && user.codeForget != "") {
      return res.status(200).json({ message: "Code Has been verified!" });
    }
    //////////////////////////////////////////////////////////
    if (req.body.codeForget != user.codeForget && user.codeForget != "") {
      console.log("Sorry! The code is incorrect!");
      return res.status(402).json({ message: "Sorry! The code is incorrect!" });
    }
    if (user.codeForget == "") {
      return res
        .status(401)
        .json({ message: "Sorry! There is no code in Database!" });
    }
  }
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const ChangePasswordForgot = async (req, res, next) => {
  // Change Password
  const { email, codeForget, password } = req.body;
  if (!email || !codeForget || !password) {
    return res.status(422).json({ error: "Something is missing" });
  } else {
    //
    const user = await User.findOne({ email: req.body.email });
    if (req.body.codeForget == user.codeForget && user.codeForget != "") {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          user.password = hash;
          user.codeForget = "";
          user.save().then((user) => {
            return res
              .status(200)
              .json({ message: "Congratulations, Password changed!" });
          });
        }
      });
    } else {
      return res.status(402).json({ message: "Sorry! The code is incorrect!" });
    }
  }
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports = {
  index,
  signup,
  signin,
  SendCodeForgot,
  VerifCodeForgot,
  ChangePasswordForgot,
};
