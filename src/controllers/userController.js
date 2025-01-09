import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

// lấy thông tin cá nhân của người đăng nhập
export const layThongTinCaNhan = async (req, res) => {
    const { MaNguoiDung } = req.user; 

    try {
        const nguoiDung = await model.USER.findOne({
            where: { MaNguoiDung }, 
            attributes: ['MaNguoiDung', 'TenNguoiDung', 'Email', 'VaiTro'], 
        });

        if (!nguoiDung) {
            return res.status(404).json({ message: "Không tìm thấy thông tin người dùng" });
        }

        return res.status(200).json({ message: "Lấy thông tin cá nhân thành công", nguoiDung });
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// chỉnh sửa thông tin cá nhân của người đăng nhập
export const thayDoiThongTinCaNhan = async (req, res) => {
    const { MaNguoiDung } = req.user; 
    const { TenNguoiDung, Email, MatKhau } = req.body; 

    try {
        // Kiểm tra người dùng có tồn tại không
        const nguoiDung = await model.USER.findOne({ where: { MaNguoiDung } });

        if (!nguoiDung) {
            return res.status(404).json({ message: "Không tìm thấy thông tin người dùng" });
        }

        // Cập nhật thông tin
        nguoiDung.TenNguoiDung = TenNguoiDung || nguoiDung.TenNguoiDung;
        nguoiDung.Email = Email || nguoiDung.Email;
        nguoiDung.MatKhau = MatKhau || nguoiDung.MatKhau;

        await nguoiDung.save();

        return res.status(200).json({ message: "Thay đổi thông tin cá nhân thành công", nguoiDung });
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra: " + error.message });
    }
};

// lấy thông tin người dùng theo id
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await model.USER.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

//lấy thông tin tất cả người dùng
export const getAllUsers = async (req, res) => {
    try {
        const users = await model.USER.findAll({
            attributes: ['MaNguoiDung', 'TenNguoiDung', 'Email', 'VaiTro'], 
        });

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

//chỉnh sửa thông tin người dùng(admin)
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { TenNguoiDung, Email, VaiTro } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await model.USER.findOne({ where: { Email } });
        if (existingUser && existingUser.MaNguoiDung !== Number(id)) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        const user = await model.USER.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        user.TenNguoiDung = TenNguoiDung;
        user.Email = Email;
        user.VaiTro = VaiTro;

        await user.save();
        res.status(200).json({ message: "Cập nhật thông tin người dùng thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

//xóa người dùng
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await model.USER.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        await user.destroy();
        res.status(200).json({ message: "Xóa người dùng thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};
