import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { layDanhSachDanhMuc, suaDanhMuc, themDanhMuc, xoaDanhMuc } from '../controllers/categoryController.js';


const categoryRouter = express.Router();

// lấy danh sách tất cả danh mục
categoryRouter.get('/danhmuc/all',isAuthenticated, isAdmin, layDanhSachDanhMuc);

// thêm danh mục
categoryRouter.post('/danhmuc/add',isAuthenticated, isAdmin, themDanhMuc);

// sửa danh mục
categoryRouter.put('/danhmuc/put/:id',isAuthenticated, isAdmin, suaDanhMuc);

// xóa danh mục
categoryRouter.delete('/danhmuc/delete/:id',isAuthenticated, isAdmin, xoaDanhMuc);


export default categoryRouter;
