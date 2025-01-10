import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

// kiểm duyệt công thức
export const kiemDuyetCongThuc = async (req, res) => {
    const { MaKiemDuyet, TrangThai, LyDo } = req.body;

    try {
        const congThucKiemDuyet = await model.KIEMDUYET.findByPk(MaKiemDuyet);
        if (!congThucKiemDuyet) {
            return res.status(404).json({ message: "Công thức không tồn tại trong danh sách kiểm duyệt" });
        }

        // Lấy TenDanhMuc từ MaDanhMuc trong công thức
        const danhMuc = await model.DANHMUC.findByPk(congThucKiemDuyet.MaDanhMuc);
        if (!danhMuc) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }

        if (TrangThai === "Duyet") {
            // Chuyển công thức sang bảng CONGTHUC
            const congThuc = await model.CONGTHUC.create({
                TenCongThuc: congThucKiemDuyet.TenCongThuc,
                HinhAnh: congThucKiemDuyet.HinhAnh,
                MoTa: congThucKiemDuyet.MoTa,
                ThoiGianNau: congThucKiemDuyet.ThoiGianNau,
                NguyenLieu: congThucKiemDuyet.NguyenLieu,
                CachLam: congThucKiemDuyet.CachLam,
                MaNguoiDung: congThucKiemDuyet.MaNguoiDung,
                MaDanhMuc: congThucKiemDuyet.MaDanhMuc
            });

            // Xoá công thức đã duyệt khỏi bảng KIEMDUYET
            await congThucKiemDuyet.destroy();

            return res.status(200).json({ message: "Công thức đã được duyệt và chuyển vào danh sách công thức", congThuc });
        } else if (TrangThai === "KhongDuyet") {
            // Nếu không duyệt, chuyển công thức vào bảng BLACKLIST
            const blacklist = await model.BLACKLIST.create({
                TenCongThuc: congThucKiemDuyet.TenCongThuc,
                HinhAnh: congThucKiemDuyet.HinhAnh,
                MoTa: congThucKiemDuyet.MoTa,
                ThoiGianNau: congThucKiemDuyet.ThoiGianNau,
                NguyenLieu: congThucKiemDuyet.NguyenLieu,
                CachLam: congThucKiemDuyet.CachLam,
                MaNguoiDung: congThucKiemDuyet.MaNguoiDung,
                LyDo: LyDo || "Không có lý do",
                MaDanhMuc: congThucKiemDuyet.MaDanhMuc
            });

            // Xoá công thức không duyệt khỏi bảng KIEMDUYET
            await congThucKiemDuyet.destroy();

            return res.status(200).json({ message: "Công thức đã bị từ chối và chuyển vào danh sách BLACKLIST", blacklist });
        } else {
            return res.status(400).json({ message: "Trạng thái không hợp lệ" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Lấy danh sách công thức trong bảng KIEMDUYET
export const layDanhSachCongThucKiemDuyet = async (req, res) => {
    try {
        const danhSachCongThucKiemDuyet = await model.KIEMDUYET.findAll();

        return res.status(200).json({
            message: "Lấy danh sách công thức trong bảng KIEMDUYET thành công",
            danhSachCongThucKiemDuyet,
        });
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// Xóa công thức theo MaKiemDuyet trong bảng KIEMDUYET
export const xoaCongThucKiemDuyet = async (req, res) => {
    const { MaKiemDuyet } = req.params;

    try {
        const congThucKiemDuyet = await model.KIEMDUYET.findByPk(MaKiemDuyet);

        if (!congThucKiemDuyet) {
            return res.status(404).json({ message: "Công thức không tồn tại trong bảng KIEMDUYET" });
        }

        await congThucKiemDuyet.destroy();

        return res.status(200).json({ message: "Xóa công thức trong bảng KIEMDUYET thành công" });
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};