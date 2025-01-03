import express from 'express';
import { layCongThucNguoiDung, layDanhSachCongThuc, suaCongThuc, themCongThuc, xoaCongThuc } from '../controllers/recipeController.js';
import { isAuthenticated } from '../middleware/auth.js';


const recipeRouter = express.Router();

recipeRouter.post('/cong-thuc/add',isAuthenticated, themCongThuc);
recipeRouter.put('/cong-thuc/put/:id',isAuthenticated, suaCongThuc);
recipeRouter.delete('/cong-thuc/delete/:id',isAuthenticated, xoaCongThuc);
// Lấy danh sách tất cả công thức
recipeRouter.get("/cong-thuc",isAuthenticated, layDanhSachCongThuc);
// Lấy danh sách công thức của người dùng tạo
recipeRouter.get("/cong-thuc/nguoi-dung",isAuthenticated, layCongThucNguoiDung);
export default recipeRouter;
