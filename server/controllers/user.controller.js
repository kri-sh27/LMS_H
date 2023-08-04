import  AppError   from "../utils/appError.js";
import User from "../models/user.model.js";
const cookieOptions = {
  seure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
};

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("email alredy exists", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/demo/image/upload/ar_1.0,c_thumb,g_face,w_0.6,z_0.7/r_max/co_black,e_outline/co_grey,e_shadow,x_40,y_55/actor.png",
    },
  });
  if (!User) {
    return next(new AppError("User registration failed try again", 400));
  }

  //TODO:upload user picture
  await User.save();
  //TODO:set jwt token in cookie

  user.password = "undefined";

  res.status(200).json({
    success: true,
    message: "user registered successfully",
    user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("all fields are required", 400));
  }
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user || !user.comparePassword(password)) {
    //TODO
    return next(new AppError("Emil or password o not match0", 400));
  }
  const token = await user.generateJWTToken();
  user.password = undefined;

  res.cookie("cookie", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "user registerd suueccsfully",
    user,
  });
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });
  
  res.status(200).json({
    success:true,
    message:"User logged out successfully"
  })
};

const getProfile = (req, res) => {
    const userId=User.findById(req.user.id);
    res.status(200).json({
        success:true,
        message:"user details",
        user
    })
};

export
{
  register,
  login,
  logout,
  getProfile,
};
