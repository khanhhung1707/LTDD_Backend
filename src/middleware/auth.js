import { responseData } from '../config/response.js';
import { verifyToken } from '../config/jwt.js';

// Middleware kiểm tra xem người dùng có phải admin không
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return responseData(res, 403, "Không tìm thấy thông tin người dùng", null);
  }

  if (!req.user.VaiTro) {
    return responseData(res, 403, "Không tìm thấy quyền truy cập của người dùng", null);
  }

  const { VaiTro } = req.user;

  if (VaiTro !== 'Admin') {
    return responseData(res, 403, "Bạn không có quyền truy cập", null);
  }

  next();  // Nếu role là admin, tiếp tục thực hiện request
};


// Middleware kiểm tra người dùng đã đăng nhập
export const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Token from request:', token); // Log token từ header
  
  if (!token) {
      console.log('Token is missing'); // Log khi không có token
      return responseData(res, 401, "Chưa đăng nhập", null);
  }

  try {
      const decoded = verifyToken(token);  
      console.log('Decoded token:', decoded); // Log decoded token để kiểm tra
      if (!decoded || !decoded.data || !decoded.data.VaiTro) {
          console.log('Decoded data is missing or role is undefined'); // Log khi thiếu dữ liệu hoặc role
          return responseData(res, 401, "Token không hợp lệ", null);
      }

      console.log('Decoded user data:', decoded.data); // Log dữ liệu người dùng
      req.user = decoded.data;

      next();
  } catch (error) {
      console.log('Token verification error:', error.message); // Log lỗi khi xác thực token
      return responseData(res, 401, "Token không hợp lệ", null);
  }
};


