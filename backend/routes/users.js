const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// All routes are protected and admin only
router.use(auth);
router.use(admin);

// @route GET /api/users
router.get('/', getUsers);

// @route GET /api/users/stats
router.get('/stats', getUserStats);

// @route GET /api/users/:id
router.get('/:id', getUser);

// @route PUT /api/users/:id
router.put('/:id', updateUser);

// @route DELETE /api/users/:id
router.delete('/:id', deleteUser);
router.put('/preferences', auth, async (req, res) => {
  try {
    const userId = req.user.id; // `req.user` should be set by `auth` middleware
    const preferences = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { preferences },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Preferences updated', user: updatedUser });
  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;