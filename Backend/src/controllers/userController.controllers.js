
import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  try {
    if (req.userRole === 'admin') {
     
      const users = await User.findAll();
      res.json({ success: true, users });
    } else if (req.userRole === 'user') {
      
      const user = await User.findByPk(req.userId);
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
      } else {
        res.json({ success: true, user });
      }
    } else {
      res.status(403).json({ success: false, message: 'Forbidden - Insufficient privileges' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email } = req.body;
  try {
   
    if (req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden - Insufficient privileges' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
    } else {
      user.fname = fname;
      user.lname = lname;
      await user.save();
      res.json({ success: true, user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

