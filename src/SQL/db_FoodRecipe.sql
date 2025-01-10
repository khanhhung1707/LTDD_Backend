/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `BLACKLIST`;
CREATE TABLE `BLACKLIST` (
  `MaBlacklist` int NOT NULL AUTO_INCREMENT,
  `TenCongThuc` varchar(255) NOT NULL,
  `HinhAnh` text,
  `MoTa` text,
  `ThoiGianNau` int NOT NULL COMMENT 'Thời gian nấu tính bằng phút',
  `NguyenLieu` text NOT NULL COMMENT 'Danh sách nguyên liệu',
  `CachLam` text NOT NULL COMMENT 'Các bước thực hiện',
  `MaNguoiDung` int NOT NULL,
  `LyDo` text COMMENT 'Không phù hợp',
  `NgayChuyen` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `MaDanhMuc` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`MaBlacklist`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  KEY `MaDanhMuc` (`MaDanhMuc`),
  CONSTRAINT `BLACKLIST_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `USER` (`MaNguoiDung`),
  CONSTRAINT `BLACKLIST_ibfk_2` FOREIGN KEY (`MaDanhMuc`) REFERENCES `DANHMUC` (`MaDanhMuc`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `CONGTHUC`;
CREATE TABLE `CONGTHUC` (
  `MaCongThuc` int NOT NULL AUTO_INCREMENT,
  `TenCongThuc` varchar(255) NOT NULL,
  `HinhAnh` text,
  `MoTa` text,
  `ThoiGianNau` int NOT NULL COMMENT 'Thời gian nấu tính bằng phút',
  `NguyenLieu` text NOT NULL COMMENT 'Danh sách nguyên liệu',
  `CachLam` text NOT NULL COMMENT 'Các bước thực hiện',
  `MaNguoiDung` int NOT NULL,
  `MaDanhMuc` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`MaCongThuc`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  KEY `MaDanhMuc` (`MaDanhMuc`),
  CONSTRAINT `CONGTHUC_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `USER` (`MaNguoiDung`),
  CONSTRAINT `CONGTHUC_ibfk_2` FOREIGN KEY (`MaDanhMuc`) REFERENCES `DANHMUC` (`MaDanhMuc`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DANHGIA`;
CREATE TABLE `DANHGIA` (
  `MaDanhGia` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int NOT NULL,
  `MaCongTrinh` int NOT NULL,
  `SoSao` int DEFAULT NULL,
  `NgayDanhGia` date DEFAULT NULL,
  PRIMARY KEY (`MaDanhGia`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  CONSTRAINT `DANHGIA_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `USER` (`MaNguoiDung`),
  CONSTRAINT `DANHGIA_chk_1` CHECK ((`SoSao` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DANHMUC`;
CREATE TABLE `DANHMUC` (
  `MaDanhMuc` int NOT NULL AUTO_INCREMENT,
  `TenDanhMuc` varchar(255) NOT NULL,
  PRIMARY KEY (`MaDanhMuc`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `KIEMDUYET`;
CREATE TABLE `KIEMDUYET` (
  `MaKiemDuyet` int NOT NULL AUTO_INCREMENT,
  `TenCongThuc` varchar(255) NOT NULL,
  `HinhAnh` text,
  `MoTa` text,
  `ThoiGianNau` int NOT NULL COMMENT 'Thời gian nấu tính bằng phút',
  `NguyenLieu` text NOT NULL COMMENT 'Danh sách nguyên liệu',
  `CachLam` text NOT NULL COMMENT 'Các bước thực hiện',
  `MaNguoiDung` int NOT NULL,
  `TrangThai` enum('DangCho','Duyet','KhongDuyet') DEFAULT 'DangCho',
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `MaDanhMuc` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`MaKiemDuyet`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  KEY `MaDanhMuc` (`MaDanhMuc`),
  CONSTRAINT `KIEMDUYET_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `USER` (`MaNguoiDung`),
  CONSTRAINT `KIEMDUYET_ibfk_2` FOREIGN KEY (`MaDanhMuc`) REFERENCES `DANHMUC` (`MaDanhMuc`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `LICHSU`;
CREATE TABLE `LICHSU` (
  `MaLichSu` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int NOT NULL,
  `MaCongThuc` int NOT NULL,
  `ThoiGianXem` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaLichSu`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  KEY `MaCongThuc` (`MaCongThuc`),
  CONSTRAINT `LICHSU_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `USER` (`MaNguoiDung`),
  CONSTRAINT `LICHSU_ibfk_2` FOREIGN KEY (`MaCongThuc`) REFERENCES `CONGTHUC` (`MaCongThuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
  `MaNguoiDung` int NOT NULL AUTO_INCREMENT,
  `TenNguoiDung` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `VaiTro` enum('Admin','User') NOT NULL,
  PRIMARY KEY (`MaNguoiDung`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `YEUTHICH`;
CREATE TABLE `YEUTHICH` (
  `MaYeuThich` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int NOT NULL,
  `MaCongThuc` int NOT NULL,
  `NgayYeuThich` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaYeuThich`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  KEY `MaCongThuc` (`MaCongThuc`),
  CONSTRAINT `YEUTHICH_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `USER` (`MaNguoiDung`),
  CONSTRAINT `YEUTHICH_ibfk_2` FOREIGN KEY (`MaCongThuc`) REFERENCES `CONGTHUC` (`MaCongThuc`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BLACKLIST` (`MaBlacklist`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `LyDo`, `NgayChuyen`, `MaDanhMuc`) VALUES
(1, 'Phở bò 3', NULL, 'Món ăn truyền thống Việt Nam, ngon tuyệt vời', 80, 'Thịt bò, bánh phở, rau thơm, ngò, quế, gia vị', 'Nấu nước dùng, luộc thịt, xào rau, vắt phở', 3, 'Công thức không phù hợp', '2025-01-06 15:41:17', 1);
INSERT INTO `BLACKLIST` (`MaBlacklist`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `LyDo`, `NgayChuyen`, `MaDanhMuc`) VALUES
(3, 'Phở bò 5', 'https://phongvu.vn/cong-nghe/wp-content/uploads/2024/09/130-hinh-nen-may-tinh-4k-6-1024x640.jpg', 'Món ăn truyền thống Việt Nam, ngon tuyệt vời', 80, 'Thịt bò, bánh phở, rau thơm, ngò, quế, gia vị', 'Nấu nước dùng, luộc thịt, xào rau, vắt phở', 3, 'Công thức không phù hợp', '2025-01-09 09:30:19', 1);


INSERT INTO `CONGTHUC` (`MaCongThuc`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `MaDanhMuc`) VALUES
(1, 'Phở bò 1', NULL, 'Món ăn truyền thống Việt Nam', 45, 'Thịt bò, bánh phở, rau thơm, ngò, quế', 'Nấu nước dùng, luộc thịt...', 2, 1);
INSERT INTO `CONGTHUC` (`MaCongThuc`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `MaDanhMuc`) VALUES
(3, 'Phở bò 2', NULL, 'Món ăn truyền thống Việt Nam, ngon tuyệt vời', 60, 'Thịt bò, bánh phở, rau thơm, ngò, quế, gia vị', 'Nấu nước dùng, luộc thịt, xào rau, vắt phở', 3, 1);
INSERT INTO `CONGTHUC` (`MaCongThuc`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `MaDanhMuc`) VALUES
(4, 'Phở bò 4', 'https://phongvu.vn/cong-nghe/wp-content/uploads/2024/09/130-hinh-nen-may-tinh-4k-6-1024x640.jpg', 'Món ăn truyền thống Việt Nam, ngon tuyệt vời', 80, 'Thịt bò, bánh phở, rau thơm, ngò, quế, gia vị', 'Nấu nước dùng, luộc thịt, xào rau, vắt phở', 3, 1);



INSERT INTO `DANHMUC` (`MaDanhMuc`, `TenDanhMuc`) VALUES
(1, 'Món ăn Việt Nam');


INSERT INTO `KIEMDUYET` (`MaKiemDuyet`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `TrangThai`, `NgayTao`, `MaDanhMuc`) VALUES
(2, 'Phở bò 3', NULL, 'Món ăn truyền thống Việt Nam, ngon tuyệt vời', 80, 'Thịt bò, bánh phở, rau thơm, ngò, quế, gia vị', 'Nấu nước dùng, luộc thịt, xào rau, vắt phở', 3, 'DangCho', '2025-01-06 15:37:06', 1);




INSERT INTO `USER` (`MaNguoiDung`, `TenNguoiDung`, `Email`, `MatKhau`, `VaiTro`) VALUES
(1, 'Nguyen Van A new', 'nguyenvana@example.com', '$2b$10$O2J6prJ6y0iOYyVu8xH9WOq.qMIRFgzSHnyZL82mh3eXSa5HuVl6i', 'User');
INSERT INTO `USER` (`MaNguoiDung`, `TenNguoiDung`, `Email`, `MatKhau`, `VaiTro`) VALUES
(2, 'Nguyễn Khánh Hưng new', 'nguyenkhanhhung@gmail.com', '$2b$10$cJunidz1NOfn9FH5ZqA3Z.uKmwLU3N74fzcZSXN3JH7Zt6X8kcFqG', 'User');
INSERT INTO `USER` (`MaNguoiDung`, `TenNguoiDung`, `Email`, `MatKhau`, `VaiTro`) VALUES
(3, 'Nguyễn Khánh Hưng 1', 'nguyenkhanhhung1@gmail.com', '$2b$10$hCrmUPxvlejuxgYVoAnUM.zrgvBQhtJ9uYChMT1KfpsIEUKPC662.', 'Admin');

INSERT INTO `YEUTHICH` (`MaYeuThich`, `MaNguoiDung`, `MaCongThuc`, `NgayYeuThich`) VALUES
(1, 2, 1, '2025-01-06 16:46:28');
INSERT INTO `YEUTHICH` (`MaYeuThich`, `MaNguoiDung`, `MaCongThuc`, `NgayYeuThich`) VALUES
(3, 2, 3, '2025-01-06 16:47:42');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;