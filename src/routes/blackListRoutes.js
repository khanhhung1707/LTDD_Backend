import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { layDanhSachCongThucBlacklist, xoaCongThucBlacklist } from '../controllers/blackListController.js';


const blackListRouter = express.Router();

// Lấy danh sách công thức trong bảng BLACKLIST
blackListRouter.get('/blacklist/all',isAuthenticated, isAdmin, layDanhSachCongThucBlacklist);

// Xóa công thức theo MaBlackList trong bảng BLACKLIST
blackListRouter.delete('/blacklist/delete/:MaBlackList',isAuthenticated, isAdmin, xoaCongThucBlacklist);


export default blackListRouter;
