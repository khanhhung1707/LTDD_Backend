import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

// Lấy danh sách công thức trong bảng BLACKLIST
export const layDanhSachCongThucBlacklist = async (req, res) => {
    try {
        const danhSachCongThucBlacklist = await model.BLACKLIST.findAll();

        return res.status(200).json({
            message: "Lấy danh sách công thức trong bảng BLACKLIST thành công",
            danhSachCongThucBlacklist,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách công thức trong bảng BLACKLIST:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Xóa công thức theo MaBlackList trong bảng BLACKLIST
export const xoaCongThucBlacklist = async (req, res) => {
    const { MaBlackList } = req.params;

    try {
        const congThucBlacklist = await model.BLACKLIST.findByPk(MaBlackList);

        if (!congThucBlacklist) {
            return res.status(404).json({ message: "Công thức không tồn tại trong bảng BLACKLIST" });
        }

        await congThucBlacklist.destroy();

        return res.status(200).json({ message: "Xóa công thức trong bảng BLACKLIST thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa công thức trong bảng BLACKLIST:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};