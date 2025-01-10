import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

// thêm đánh giá
export const themDanhGia = async (req, res) => {
    const {  MaCongThuc, SoSao, BinhLuan } = req.body;
    const { MaNguoiDung } = req.user;

    try {
        const danhGia = await model.DANHGIA.create({
            MaNguoiDung,
            MaCongThuc,
            SoSao,
            BinhLuan,
        });

        return res.status(201).json({ message: "Thêm đánh giá thành công", danhGia });
    } catch (error) {
        console.error("Lỗi khi thêm đánh giá:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// sửa đánh giá
export const suaDanhGia = async (req, res) => {
    const { id } = req.params; 
    const { SoSao, BinhLuan } = req.body;

    try {
        const danhGia = await model.DANHGIA.findByPk(id);
        if (!danhGia) {
            return res.status(404).json({ message: "Không tìm thấy đánh giá" });
        }

        danhGia.SoSao = SoSao ?? danhGia.SoSao;
        danhGia.BinhLuan = BinhLuan ?? danhGia.BinhLuan;
        await danhGia.save();

        return res.status(200).json({ message: "Sửa đánh giá thành công", danhGia });
    } catch (error) {
        console.error("Lỗi khi sửa đánh giá:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// xóa đánh giá 
export const xoaDanhGia = async (req, res) => {
    const { id } = req.params; 

    try {
        const danhGia = await model.DANHGIA.findByPk(id);
        if (!danhGia) {
            return res.status(404).json({ message: "Không tìm thấy đánh giá" });
        }

        await danhGia.destroy();
        return res.status(200).json({ message: "Xóa đánh giá thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa đánh giá:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Lấy nhận xét theo MaCongThuc
export const layDanhGiaTheoCongThuc = async (req, res) => {
    const { MaCongThuc } = req.params;

    try {
        const danhGia = await model.DANHGIA.findAll({
            where: { MaCongThuc },
            include: [
                {
                    model: model.USER,
                    as: 'MaNguoiDung_USER',
                    attributes: ['MaNguoiDung', 'TenNguoiDung'],
                },
            ],
        });

        if (!danhGia.length) {
            return res.status(404).json({ message: "Không có đánh giá nào cho công thức này" });
        }

        return res.status(200).json({ message: "Lấy danh sách đánh giá thành công", danhGia });
    } catch (error) {
        console.error("Lỗi khi lấy đánh giá theo công thức:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Lấy tất cả nhận xét
export const layTatCaDanhGia = async (req, res) => {
    try {
        const danhGia = await model.DANHGIA.findAll({
            include: [
                {
                    model: model.USER,
                    as: 'MaNguoiDung_USER',
                    attributes: ['MaNguoiDung', 'TenNguoiDung'],
                },
                {
                    model: model.CONGTHUC,
                    as: 'MaCongThuc_CONGTHUC',
                    attributes: ['MaCongThuc', 'TenCongThuc'],
                },
            ],
        });

        return res.status(200).json({ message: "Lấy danh sách tất cả đánh giá thành công", danhGia });
    } catch (error) {
        console.error("Lỗi khi lấy tất cả đánh giá:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};