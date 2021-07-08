const { name } = require('browser-sync');
const fs = require('fs');
const { Index } = require('typeorm');
const data = require("../data.json");
const { date } = require("../utils");

exports.index = function (req, res) {
    return res.render("members/index", { members: data.members })
}

exports.create = function (req, res) {
    return res.render("members/create")
}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)


    for (key of keys) {
        //requ.body.key == ""
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }


    birth = Date.parse(req.body.birth);
    let id = 1
    const lastMember = data.members[data.members.length - 1]
    if (lastMember) {
        id = lastMember.id + 1
    }


    data.members.push({
        id,
        ...req.body,
        birth
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!");

        return res.redirect(`/members/${id}`)

    });

    // Imprime no browers
    // return res.send(req.body);

}

exports.show = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return id == member.id
    });

    if (!foundMember) return res.send("Members not found!")


    const member = {
        ...foundMember,
        birth: //"2020-02-01"
            date(foundMember.birth).birthDay // yyyy-m-d
    }

    return res.render("members/show", { member })

}


exports.edit = function (req, res) {

    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return id == member.id
    });

    if (!foundMember) return res.send("Members not found!")

    //Formato que espera a data nascimento 
    //member.birth = 473385600000
    //date(member.birth)
    //return yyyy-mm-dd


    const member = {
        ...foundMember,
        birth: //"2020-02-01"
            date(foundMember.birth).iso // yyyy-m-d
    }


    return res.render('members/edit', { member })
}


exports.put = function (req, res) {
    const { id } = req.body
    let index = 0


    const foundMember = data.members.find(function (member, foundindex) {
        if (id == member.id) {
            index = foundindex
            return true
        }
    });

    if (!foundMember) return res.send("Members not found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }


    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })

}


exports.delete = function (req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function (member) {
        return member.id != id

    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

        if (err) return res.send("Write file error!")

        return res.redirect("/members")

    })
}