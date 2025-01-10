import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { layDanhGiaTheoCongThuc, layTatCaDanhGia, suaDanhGia, themDanhGia, xoaDanhGia } from '../controllers/ratingController.js';



const ratingRouter = express.Router();


// Thêm đánh giá
ratingRouter.post('/danhgia/add',isAuthenticated, themDanhGia); 
// Sửa đánh giá
ratingRouter.put('/danhgia/put/:id',isAuthenticated, suaDanhGia); 
// Xóa đánh giá
ratingRouter.delete('/danhgia/delete/:id',isAuthenticated, xoaDanhGia); 
// Lấy đánh giá theo từng công thức
ratingRouter.get('/danhgia/:MaCongThuc',isAuthenticated, layDanhGiaTheoCongThuc);
// Lấy tất cả đánh giá
ratingRouter.get('/danhgia/get/all',isAuthenticated, isAdmin, layTatCaDanhGia);

export default ratingRouter;
