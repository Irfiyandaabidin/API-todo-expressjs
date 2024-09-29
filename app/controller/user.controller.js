const User = require("../model/user.model");

const bcrypt = require("bcryptjs/dist/bcrypt");
const ImageKit = require("imagekit");
const fs = require("fs");

const index = async (req, res) => {
  try {
    if(req.query.search) {
      const lowerSearch = req.query.search.toLowerCase();
      const users = await User.query()
        .whereRaw(`LOWER(email) like ?`, [`%${lowerSearch}%`])
        .orWhereRaw(`LOWER(name) like ?`, [`%${lowerSearch}%`]);

      if(users.length == 0) {
        return res.status(404).json({
          status: 404,
          message: "User not found!",
          data: null,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "OK!",
        data: users,
      });
    }
    const users = await User.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    const user = await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    res.status(201).json({
      status: 201,
      message: "Success create!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const show = async (req, res) => {
  try {
    const user = await User.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  try {
    if(req.params.id != req.user.id) {
      return res.status(403).json({
        status : 403,
        message: "Can't access to update this profile!",
        data: null
      })
    }
    const imagekit = new ImageKit({
      publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
      privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
      urlEndpoint: process.env.URL_ENDPOINT_IMAGEKIT
    })

    const imageRes = await new Promise((resolve, rejects) => {
      imagekit.upload({
        file: fs.readFileSync(req.file.path),
        fileName: req.file.filename
      }, (error, result) => {
        if (error) {
          return rejects(error);
        }
        resolve(result);
      });
    })

    const user = await User.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
        email: req.body.email,
        image_profile: req.file && imageRes.url
      });
      if(req.body.password){
        await User.query()
          .findById(req.params.id)
          .patch({
            password: await bcrypt.hash(req.body.password, 10),
          });
      }

    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const user = await User.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const profile = async(req, res) => {
  try {
    const user = await User.query().findById(req.user.id);
    return res.status(200).json({
      status: 200,
      message: "Success get profile!",
      data: user,
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error!",
    })
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
  profile
};
