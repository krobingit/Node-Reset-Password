import { mongo } from "../mongo/mongo.js";
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import { sendMail } from "../mongo/sendMail.js";


export const helper = {

 async sendToken(req, res) {
  const {email}=req.body
  let userDB = await mongo.users.findOne({ email: email })
  if (!userDB)
   return res.status(400).send({ message: "User doesnt exist" })
//creating random string and bcrypt to hash the token
    let token = randomstring.generate(32);
    console.log(token)
    const hashtoken = await bcrypt.hash(token, Number(10))
    console.log(hashtoken)
    //creating expiry after 1 hour
    let expiry = new Date(Date.now()+3600*1000)
    //updating users collection with resetToken and resetExpiry Time
    const resetUpdateDB = await mongo.users.findOneAndUpdate({ email: email }, {
      $set: {
        "resetToken": hashtoken,
        "resetExpiry": expiry,
        }
    }, { returnNewDocument: true })


    let link = `https://password-reset-mern.netlify.app/resetPassword/${userDB._id}/${token}`;

    const emailresult=  await sendMail(userDB.email, "Password Reset", `${link}`);



    res.status(200).send({
      message:
        "Reset link sent to mail",emailresult:emailresult
    });

},

  async verifyToken(req, res) {


 },
   async verifyAndUpdatePassword(req, res) {


}

}
