const { name } = require('browser-sync');
const fs = require('fs');
const { Index } = require('typeorm');
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = function (req, res) {
    return res.render("members/index", { members: data.members })
}

exports.show = function (req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return id == member.id
    });

    if (!foundMember) return res.send("Members not found!")




    const member = {
        ...foundMember,
        age: age(foundMember.birth)
    }

    return res.render("members/show", { member })

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

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.members.length + 1);


    data.members.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!");

        return res.redirect("/members")

    });

    // Imprime no browers
    // return res.send(req.body);

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
            date(foundMember.birth) // yyyy-m-d
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