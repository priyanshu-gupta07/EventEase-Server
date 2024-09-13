import users from "../models/user.js";
import { jwtsign, jwtverify } from "../utils/Auth.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

const HandleSignup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await users.create({
      username,
      email,
      password: hash,
      role,
    });

    const token = jwtsign({
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });

    res.status(201).json({
      message: "User created successfully",
      user: { username: newUser.username, email: newUser.email },
      token: token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

const HandleLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await users.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwtsign({
                username: user.username,
                email: user.email,
                role: user.role,
            });
            res.cookie('token', token);
            res.cookie('_id', user._id);
            res.status(200).json({
                message: 'User authenticated',
                user: { username: user.username, email: user.email,role: user.role },
                token: token
            });
        } else {
            res.status(401).json({message: 'Authentication failed'});
        }
    } catch (err) {
        res.status(500).json({message: 'Internal server error', error: err.message});
    }
}

const HandleLogout=async(req,res)=>{
    res.clearCookie('token');
    res.clearCookie('_id');
    res.status(200).json({ message: 'Logged out successfully' });
}

export { HandleSignup, HandleLogin, HandleLogout };
