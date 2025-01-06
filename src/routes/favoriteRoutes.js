import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { boYeuThichCongThuc, layDanhSachCongThucYeuThich, layDanhSachCongThucYeuThichTheoNguoiDung, yeuThichCongThuc } from '../controllers/favoriteController.js';


const favoriteRouter = express.Router();

// Lấy danh sách công thức được yêu thích (admin)
favoriteRouter.get('/yeuthich/all',isAuthenticated, isAdmin, layDanhSachCongThucYeuThich);

// Lấy danh sách công thức được yêu thích theo người đăng nhập
favoriteRouter.get('/yeuthich/getbyuser',isAuthenticated, layDanhSachCongThucYeuThichTheoNguoiDung);

//yêu thích công thức
favoriteRouter.post('/yeuthich/add',isAuthenticated, yeuThichCongThuc);

//bỏ yêu thích công thức
favoriteRouter.delete('/yeuthich/delete/:id',isAuthenticated, boYeuThichCongThuc);

export default favoriteRouter;
