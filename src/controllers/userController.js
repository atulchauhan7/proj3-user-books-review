const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const createUser = async function (req, res) {
    try {
        const data = req.body;
        const { title, name, phone, email, password, address: { street, city, pincode } } = data
        if (Object.keys(data).length > 0) {
            if (!isValid(title)) {
                return res.status(400).send({ status: false, msg: "title is required" })
            }
            if (!isValid(name)) {
                return res.status(400).send({ status: false, msg: "name is required" })
            }
            if (!isValid(phone)) {
                return res.status(400).send({ status: false, msg: "phone is required" })
            }
            if (!isValid(email)) {
                return res.status(400).send({ status: false, msg: "email is required" })
            }
            if (!isValid(password)) {
                return res.status(400).send({ status: false, msg: "password is required" })
            }
            // if(!isValid(address)){
            //     return res.status(400).send({status:false,msg:"please enter valid address"})
            // }
            if (!isValid(street)) {
                return res.status(400).send({ status: false, msg: "please enter valid street" })
            }
            if (!isValid(city)) {
                return res.status(400).send({ status: false, msg: "please enter valid city" })
            }
            if (!isValid(pincode)) {
                return res.status(400).send({ status: false, msg: "please enter valid pincode" })
            }
            const findPhone = await userModel.findOne({ phone: phone })
            if (findPhone) {
                return res.status(400).send({ status: false, msg: "Duplicate Numbers are not allowed" })
            }
            const findEmail = await userModel.findOne({ email: email })
            if (findEmail) {
                return res.status(400).send({ status: false, msg: "Duplicate emails are not allowed" })
            }
            // if (!(/^(\d{4}|\d{6})$/.test(pincode))) { return res.status(400).send({ status: false, msg: "Pincode in not valid" }) }


            const saveData = await userModel.create(data);
            return res.status(201).send({ status: true, msg: saveData })
        }
        else {
            return res.status(204).send({ status: false, msg: "please enter some data" })
        }

    } catch (error) {
        return res.status(500).send({ ERROR: error.message })
    }




}

const login = async function (req, res) {
    try {
        const data = req.body;
        const dataRes = await userModel.findOne({
            email: data.email
        })
        if (!dataRes) {
            return res.status(400).send("email id is invalid")
        }
        if (data.password != dataRes.password) {
            return res.status(400).send("please enter valid password");
        }
        if (data.password === dataRes.password) {
            const token = jwt.sign({
                id: dataRes.id
            }, '12345');
            return res.send({
                status: true,
                msg: token
            })
        }

    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })

    }
}
module.exports.createUser = createUser;
module.exports.login = login;
