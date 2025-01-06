import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

// Yêu thích công thức
export const yeuThichCongThuc = async (req, res) => {
    const { MaCongThuc } = req.body;
    const MaNguoiDung = req.user.MaNguoiDung; 

    try {
        // Kiểm tra xem công thức đã được yêu thích chưa
        const yeuThich = await model.YEUTHICH.findOne({ where: { MaNguoiDung, MaCongThuc } });
        if (yeuThich) {
            return res.status(400).json({ message: "Công thức đã được yêu thích rồi" });
        }

        // Thêm vào danh sách yêu thích
        const newYeuThich = await model.YEUTHICH.create({
            MaNguoiDung,
            MaCongThuc,
        });

        return res.status(201).json({
            message: "Đã thêm công thức vào danh sách yêu thích",
            newYeuThich,
        });
    } catch (error) {
        console.error("Lỗi khi yêu thích công thức:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Bỏ yêu thích công thức
export const boYeuThichCongThuc = async (req, res) => {
    const { MaCongThuc } = req.body;
    const MaNguoiDung = req.user.MaNguoiDung;

    try {
        // Kiểm tra xem công thức có trong danh sách yêu thích không
        const yeuThich = await model.YEUTHICH.findOne({ where: { MaNguoiDung, MaCongThuc } });
        if (!yeuThich) {
            return res.status(404).json({ message: "Công thức chưa được yêu thích" });
        }

        // Xóa khỏi danh sách yêu thích
        await yeuThich.destroy();

        return res.status(200).json({
            message: "Đã bỏ yêu thích công thức thành công",
        });
    } catch (error) {
        console.error("Lỗi khi bỏ yêu thích công thức:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Xem danh sách tất cả công thức yêu thích
export const layDanhSachCongThucYeuThich = async (req, res) => {

    try {
        // Lấy tất cả công thức yêu thích của người dùng
        const yeuThichList = await model.YEUTHICH.findAll({
            include: [{
                model: model.CONGTHUC,
                as: 'MaCongThuc_CONGTHUC',
                attributes: ['MaCongThuc', 'TenCongThuc', 'MoTa']
            }]
        });

        return res.status(200).json({
            message: "Danh sách công thức yêu thích",
            yeuThichList,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách công thức yêu thích:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Xem danh sách công thức yêu thích theo người dùng
export const layDanhSachCongThucYeuThichTheoNguoiDung = async (req, res) => {
    const MaNguoiDung = req.user.MaNguoiDung; 
    try {
        // Lấy tất cả công thức yêu thích của người dùng
        const yeuThichList = await model.YEUTHICH.findAll({
            where: { MaNguoiDung },
            include: [{
                model: model.CONGTHUC,
                as: 'MaCongThuc_CONGTHUC',
                attributes: ['MaCongThuc', 'TenCongThuc', 'MoTa']
            }]
        });

        return res.status(200).json({
            message: "Danh sách công thức yêu thích của người dùng",
            yeuThichList,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách công thức yêu thích theo người dùng:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};
