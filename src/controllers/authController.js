import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { responseData } from "../config/response.js";
import { createToken } from "../config/jwt.js";
import { sendEmail } from "../config/mail.js";
import crypto from "crypto";

const model = initModels(sequelize);

// Đăng ký
export const signUp = async (req, res) => {
    const { TenNguoiDung, Email, MatKhau, VaiTro } = req.body;
  
    try {
      // Kiểm tra email đã tồn tại chưa
      const existingUser = await model.USER.findOne({ where: { Email } });
      if (existingUser) {
        return responseData(res, 400, "Email đã tồn tại", null);
      }
  
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(MatKhau, 10);
  
      // Tạo người dùng mới
      const newUser = await model.USER.create({
        TenNguoiDung,
        Email,
        MatKhau: hashedPassword,
        VaiTro: VaiTro || "User",
      });
  
      // Tạo token
      const token = createToken(newUser.MaNguoiDung);
  
      return responseData(res, 201, "Đăng ký thành công", {
        token,
        user: { ...newUser.toJSON(), MatKhau: undefined }, 
      });
    } catch (error) {
      return responseData(res, 500, "Lỗi khi đăng ký", error);
    }
  };

// Đăng nhập
export const signIn = async (req, res) => {
    const { Email, MatKhau } = req.body;
  
    // Kiểm tra email và mật khẩu có được cung cấp hay không
    if (!Email || !MatKhau) {
      return responseData(res, 400, "Email và mật khẩu là bắt buộc");
    }
  
    try {
      // Tìm người dùng theo email
      const user = await model.USER.findOne({ where: { Email } });
  
      if (!user) {
        return responseData(res, 404, "Người dùng không tồn tại");
      }
  
      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
      if (!isMatch) {
        return responseData(res, 401, "Mật khẩu không chính xác");
      }
  
      // Tạo token
      const token = createToken(user.MaNguoiDung);
  
      // Trả về thông tin người dùng
      return responseData(res, 200, "Đăng nhập thành công", {
        token,
        user: { ...user.toJSON(), MatKhau: undefined }, 
      });
    } catch (error) {
      return responseData(res, 500, "Lỗi khi đăng nhập", error);
    }
  };
  

// Tạo mật khẩu ngẫu nhiên
const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex");
};

//quên mật khẩu
export const forgotPassword = async (req, res) => {
  const { Email } = req.body;

  try {
    // Kiểm tra xem email có tồn tại trong hệ thống không
    const user = await model.USER.findOne({ where: { Email } });

    if (!user) {
      return responseData(res, 404, "Người dùng không tồn tại với email này");
    }

    // Tạo mật khẩu mới
    const newPassword = generateRandomPassword();

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    await model.USER.update(
      { MatKhau: hashedPassword },
      { where: { Email } }
    );

    // Gửi mật khẩu mới qua email
    const subject = "Đặt lại mật khẩu";
    const text = `Xin chào ${user.TenNguoiDung},\n\nMật khẩu mới của bạn là: ${newPassword}\nVui lòng đăng nhập lại và thay đổi mật khẩu.`;
    await sendEmail(Email, subject, text);

    // Trả về thông báo thành công
    return responseData(res, 200, "Mật khẩu mới đã được gửi qua email của bạn");
  } catch (error) {
    return responseData(res, 500, "Lỗi máy chủ", error);
  }
};

// đổi mật khẩu 
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const user = await model.USER.findByPk(req.user.MaNguoiDung);

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return responseData(res, 404, "Người dùng không tồn tại");
    }

    // So sánh mật khẩu cũ nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(oldPassword, user.MatKhau);
    if (!isMatch) {
      return responseData(res, 401, "Mật khẩu cũ không chính xác");
    }

    // Nếu mật khẩu cũ đúng, mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.MatKhau = hashedNewPassword;
    await user.save();

    return responseData(res, 200, "Đã thay đổi mật khẩu thành công");
  } catch (error) {
    return responseData(res, 500, "Có lỗi xảy ra", error);
  }
};
