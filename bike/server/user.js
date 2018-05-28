const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const _filter = {'pwd': 0, '__v': 0}
const appData = require('./mock_data/mock_data.json')
const first_page_info = appData.firstPage
const classify_page_info = appData.classifies
// Chat.remove({}, (err, doc) => {})
Router.get('/info', (req, res) => {
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '后端出错'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }

    })
})
Router.get('/list', (req, res) => {
    // User.remove({}, (err, doc) => {})
    const {type} = req.query
    User.find({type}, (err, doc) => {
        return res.json({code: 0, data: doc})
    })
})
Router.get('/getmsglist', (req, res) => {
    const user = req.cookies.userid
    User.find({}, (err, userdoc) => {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or': [{from: user}, {to: user}]}, (err, doc) => {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
})
Router.post('/readmsg', (req, res) => {
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update({from, to: userid}, {'$set': {read: true}}, {multi: true}, (err, doc) => {
        if (!err) {
            return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1, msg: '修改失败'})
    })
})
Router.post('/update', (req, res) => {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({code: 1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data})
    })
})
Router.post('/login', (req, res) => {
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或者密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})
Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body
    User.findOne({user}, (err, doc) => {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, pwd: md5Pwd(pwd), type})
        userModel.save((err, doc) => {
            if (err) {
                return res.json({code: 1, msg: '后端出错'})
            }
            const {user, type, _id} = doc
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
})
Router.get('/content', (req, res) => {
    res.json({
        errno: 0,
        data: first_page_info
    })
})
Router.get('/classify', (req, res) => {
    res.json({
        errno: 0,
        data: classify_page_info
    })
})
function md5Pwd(pwd) {
    const salt = 'sdf~_+++===,./4589'
    return utils.md5(utils.md5(pwd + salt))
}
module.exports = Router