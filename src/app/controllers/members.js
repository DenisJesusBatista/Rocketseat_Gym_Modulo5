const { age, date } = require("../../lib/utils");
const Member = require('../models/member')

module.exports = {
    index(req, res) {

        member.all(function (members) {
            return res.render("members/index", { members })

        })



    },
    create(req, res) {
        return res.render("members/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)


        for (key of keys) {
            //requ.body.key == ""
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        member.create(req.body, function (member) {
            return res.redirect(`/members/${member.id}`)
        })

    },
    show(req, res) {
        member.find(req.params.id, function (member) {
            if (!member) return res.send("member not found!")

            member.birth = age(member.birth).birthDay


            return res.render("members/show", { member })
        })
    },

    edit(req, res) {
        member.find(req.params.id, function (member) {
            if (!member) return res.send("member not found!")

            member.birth = age(member.birth).iso

            return res.render("members/edit", { member })
        })
    },

    put(req, res) {
        const keys = Object.keys(req.body)


        for (key of keys) {
            //requ.body.key == ""
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        member.update(req.body, function () {
            return res.redirect(`/members/${req.body.id}`)
        })

    },
    /*Teste*/

    delete(req, res) {
        member.delete(req.body.id, function () {
            return res.redirect(`/members`)
        })
    },
}