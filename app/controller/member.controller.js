const MemberProject = require("../model/member.project.model");
const User = require("../model/user.model");

const store = async(req, res) => {
  try {
    const userId = await User.query().where("email", req.body.email);
    if(userId.length == 0) {
      return res.status(404).json({
        status : 404,
        message: "email not found!",
        data: null
      })
    }
    const memberProject = await MemberProject.query()
    .where("id_project", req.body.id_project)
    .where("id_user", req.user.id);
    if(memberProject.length == 0) {
      return res.status(403).json({
        status : 403,
        message: "Can't access to this project or project not found!",
        data: null
      })
    }
    const memberExist = await MemberProject.query()
    .where("id_project", req.body.id_project)
    .where("id_user", userId[0].id);
    if(memberExist.length != 0) {
      return res.status(409).json({
        status: 409,
        message: "User is already a member of this project!",
        data: null
      });
    }
    const member = await MemberProject.query().insert({
      id_user: userId[0].id,
      id_project: req.body.id_project
    })
    res.status(201).json({
      status: 201,
      message: "Success add member to join project!",
      data: member,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

const show = async (req, res) => {
  try {
    const checkMember = await MemberProject.query().where({
        id_project: req.params.id_project,
        id_user: req.user.id,
      });

    if (checkMember.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "id project not found or can't access",
        data: null,
      });
    }

    const members = await MemberProject.query()
      .where({
        id_project: req.params.id_project
      })
      .joinRelated("user")
      .select([
        "user.name",
        "user.email",
        "user.phone_number"
      ]);

    return res.status(200).json({
      status: 200,
      message: "Success get member project",
      data: members,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async(req, res) => {
  try {
    const member = await MemberProject.query().delete().where({
      id_project: req.params.id_project,
      id_user: req.user.id
    });
    if (member === 0) {
      return res.status(404).json({
        status: 404,
        message: "User is not part of this project or project not found!",
        data: null,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Success leave project",
      data: null
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error!"
    })
  }
}

module.exports = {
  store,
  show,
  destroy
}
