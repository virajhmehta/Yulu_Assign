// backend/src/controllers/authController.js
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email);
    console.log(password);
    
    const user = await User.findOne({ where: { email: { [Op.like]: email } } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        
        const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ success: true, user, token });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const signup = async (req, res) => {
  const { fname, lname, email, password, role } = req.body;
  try {
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    
    const newUser = await User.create({
      fname,
      lname,
      email,
      password,
      role,
    });
    
    const token = jwt.sign({ userId: newUser.id, role: newUser.role }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ success: true, user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const logout = (req, res) => {
  
  res.json({ success: true, message: 'Logout successful' });
};
