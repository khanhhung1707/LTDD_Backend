import express from 'express';
import { deleteUser, getAllUsers, getUserById, layThongTinCaNhan, thayDoiThongTinCaNhan, updateUser } from '../controllers/userController.js';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';

const userRouter = express.Router();

// Route lấy thông tin cá nhân
userRouter.get('/user', isAuthenticated,layThongTinCaNhan);
// Route thay đổi thông tin cá nhân
userRouter.put('/user/put',isAuthenticated, thayDoiThongTinCaNhan);
// Route admin lấy thông tin người dùng theo id
userRouter.get('/user/:id',isAuthenticated, isAdmin, getUserById);
// Route lấy danh sách tất cả người dùng
userRouter.get('/user/get/all',isAuthenticated, isAdmin, getAllUsers);
// Route chỉnh sửa thông tin người dùng (admin)
userRouter.put('/user/put/:id',isAuthenticated, isAdmin, updateUser);
// Route xóa thông tin người dùng
userRouter.delete('/user/delete/:id',isAuthenticated, isAdmin, deleteUser);

export default userRouter;
