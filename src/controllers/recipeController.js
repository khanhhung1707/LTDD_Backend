import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

//thêm công thức
export const themCongThuc = async (req, res) => {
    const { TenCongThuc, MoTa, ThoiGianNau, NguyenLieu, CachLam, MaDanhMuc } = req.body;
    const { MaNguoiDung } = req.user;

    try {
        // Lấy TenDanhMuc từ bảng DANHMUC
        const danhMuc = await model.DANHMUC.findByPk(MaDanhMuc);
        if (!danhMuc) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }

        // Thêm công thức vào bảng KIEMDUYET
        const congThuc = await model.KIEMDUYET.create({
            TenCongThuc,
            MoTa,
            ThoiGianNau,
            NguyenLieu,
            CachLam,
            MaNguoiDung,
            MaDanhMuc
        });

        return res.status(201).json({ message: "Công thức đã được gửi vào kiểm duyệt", congThuc });
    } catch (error) {
        console.error("Lỗi khi thêm công thức vào kiểm duyệt:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

//sửa công thức
export const suaCongThuc = async (req, res) => {
    const { id } = req.params;
    const { TenCongThuc, MoTa, ThoiGianNau, NguyenLieu, CachLam } = req.body;
    const { MaNguoiDung } = req.user;

    try {
        const congThuc = await model.CONGTHUC.findByPk(id);

        if (!congThuc) {
            return res.status(404).json({ message: "Công thức không tồn tại" });
        }

        if (congThuc.MaNguoiDung !== MaNguoiDung) {
            return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa công thức này." });
        }

        await congThuc.update({ TenCongThuc, MoTa, ThoiGianNau, NguyenLieu, CachLam });

        return res.status(200).json({ message: "Sửa công thức thành công", congThuc });
    } catch (error) {
        console.error("Lỗi khi sửa công thức:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};


//xóa công thức
export const xoaCongThuc = async (req, res) => {
    const { id } = req.params;

    try {
        const congThuc = await model.CONGTHUC.findByPk(id);

        if (!congThuc) {
            return res.status(404).json({ message: "Công thức không tồn tại" });
        }

        await congThuc.destroy();

        return res.status(200).json({ message: "Xóa công thức thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa công thức:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Lấy danh sách tất cả công thức
export const layDanhSachCongThuc = async (req, res) => {
    try {
        const danhSachCongThuc = await model.CONGTHUC.findAll();

        return res.status(200).json({
            message: "Lấy danh sách công thức thành công",
            danhSachCongThuc,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách công thức:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Lấy danh sách công thức do người dùng tạo
export const layCongThucNguoiDung = async (req, res) => {
    const { MaNguoiDung } = req.user;

    try {
        const danhSachCongThuc = await model.CONGTHUC.findAll({
            where: { MaNguoiDung },
        });

        if (danhSachCongThuc.length === 0) {
            return res.status(404).json({ message: "Bạn chưa tạo công thức nào." });
        }

        return res.status(200).json({
            message: "Lấy danh sách công thức người dùng thành công",
            danhSachCongThuc,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách công thức người dùng:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};
