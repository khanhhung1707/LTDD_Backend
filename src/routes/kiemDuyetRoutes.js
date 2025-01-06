import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { kiemDuyetCongThuc, layDanhSachCongThucKiemDuyet, xoaCongThucKiemDuyet } from '../controllers/kiemDuyetController.js';


const kiemDuyetRouter = express.Router();

// Endpoint kiểm duyệt công thức
kiemDuyetRouter.post("/congthuc/kiem-duyet",isAuthenticated, isAdmin, kiemDuyetCongThuc);

// Lấy danh sách công thức trong bảng KIEMDUYET
kiemDuyetRouter.get('/kiemduyet/all',isAuthenticated, isAdmin, layDanhSachCongThucKiemDuyet);

// Xóa công thức theo MaKiemDuyet trong bảng KIEMDUYET
kiemDuyetRouter.delete('/kiemduyet/delete/:MaKiemDuyet',isAuthenticated, isAdmin, xoaCongThucKiemDuyet);

export default kiemDuyetRouter;
