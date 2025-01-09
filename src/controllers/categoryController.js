import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

// Lấy danh sách tất cả danh mục
export const layDanhSachDanhMuc = async (req, res) => {
    try {
        // Lấy tất cả các danh mục từ bảng DANHMUC
        const danhMucList = await model.DANHMUC.findAll();

        return res.status(200).json({
            message: "Lấy danh sách danh mục thành công",
            danhMucList
        });
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Thêm danh mục
export const themDanhMuc = async (req, res) => {
    const { TenDanhMuc } = req.body;

    try {
        // Kiểm tra xem danh mục đã tồn tại chưa
        const danhMuc = await model.DANHMUC.findOne({ where: { TenDanhMuc } });
        if (danhMuc) {
            return res.status(400).json({ message: "Danh mục đã tồn tại" });
        }

        // Thêm danh mục mới vào bảng DANHMUC
        const newDanhMuc = await model.DANHMUC.create({
            TenDanhMuc,
        });

        return res.status(201).json({
            message: "Danh mục đã được thêm thành công",
            newDanhMuc,
        });
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Sửa danh mục
export const suaDanhMuc = async (req, res) => {
    const { id } = req.params;
    const { TenDanhMuc } = req.body;

    try {
        const danhMuc = await model.DANHMUC.findByPk(id);

        if (!danhMuc) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }

        // Cập nhật tên danh mục
        await danhMuc.update({ TenDanhMuc });

        return res.status(200).json({
            message: "Danh mục đã được sửa thành công",
            danhMuc,
        });
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Xóa danh mục
export const xoaDanhMuc = async (req, res) => {
    const { id } = req.params;

    try {
        const danhMuc = await model.DANHMUC.findByPk(id);

        if (!danhMuc) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }

        // Xóa danh mục
        await danhMuc.destroy();

        return res.status(200).json({ message: "Danh mục đã được xóa thành công" });
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};
