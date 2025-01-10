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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DANHGIA`;
CREATE TABLE `DANHGIA` (
  `MaDanhGia` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int NOT NULL,
  `SoSao` int DEFAULT NULL,
  `NgayDanhGia` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `MaCongThuc` int NOT NULL,
  PRIMARY KEY (`MaDanhGia`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  KEY `MaCongThuc` (`MaCongThuc`),
  CONSTRAINT `DANHGIA_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `USER` (`MaNguoiDung`),
  CONSTRAINT `DANHGIA_ibfk_2` FOREIGN KEY (`MaCongThuc`) REFERENCES `CONGTHUC` (`MaCongThuc`),
  CONSTRAINT `DANHGIA_chk_1` CHECK ((`SoSao` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DANHMUC`;
CREATE TABLE `DANHMUC` (
  `MaDanhMuc` int NOT NULL AUTO_INCREMENT,
  `TenDanhMuc` varchar(255) NOT NULL,
  PRIMARY KEY (`MaDanhMuc`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(3, 'Phở bò 5', 'https://phongvu.vn/cong-nghe/wp-content/uploads/2024/09/130-hinh-nen-may-tinh-4k-6-1024x640.jpg', 'Món ăn truyền thống Việt Nam, ngon tuyệt vời', 80, 'Thịt bò, bánh phở, rau thơm, ngò, quế, gia vị', 'Nấu nước dùng, luộc thịt, xào rau, vắt phở', 3, 'Công thức không phù hợp', '2025-01-09 09:30:19', 1);


INSERT INTO `CONGTHUC` (`MaCongThuc`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `MaDanhMuc`) VALUES
(4, 'Phở bò 4', 'https://phongvu.vn/cong-nghe/wp-content/uploads/2024/09/130-hinh-nen-may-tinh-4k-6-1024x640.jpg', 'Món ăn truyền thống Việt Nam, ngon tuyệt vời', 80, 'Thịt bò, bánh phở, rau thơm, ngò, quế, gia vị', 'Nấu nước dùng, luộc thịt, xào rau, vắt phở', 3, 1);
INSERT INTO `CONGTHUC` (`MaCongThuc`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `MaDanhMuc`) VALUES
(19, 'Bún Chả', 'https://tophanoiaz.com/wp-content/uploads/2023/09/hinh-anh-bun-cha-ha-noi_13.jpg', 'Món bún ăn kèm thịt nướng và nước mắm', 45, 'Thịt ba chỉ, bún, rau sống, nước mắm', '1. Ướp thịt. 2. Nướng thịt. 3. Chuẩn bị nước mắm. 4. Ăn kèm bún và rau sống.', 1, 1);
INSERT INTO `CONGTHUC` (`MaCongThuc`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `MaDanhMuc`) VALUES
(20, 'Cơm Tấm', 'https://btgroup.s3.ap-southeast-1.amazonaws.com/traveleverywhere_vn/blog/230/kDniA6H4XbpIdyrePu8sQOKgRVvMNq9XMRY9G9i6.jpg', 'Món cơm ăn kèm sườn nướng', 50, 'Gạo tấm, sườn heo, dưa leo, trứng', '1. Nướng sườn. 2. Nấu cơm. 3. Chuẩn bị dưa leo, trứng. 4. Ăn kèm cơm.', 3, 1);
INSERT INTO `CONGTHUC` (`MaCongThuc`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `MaDanhMuc`) VALUES
(21, 'Bánh Flan', 'https://nhahanglavong.com/wp-content/uploads/hinh-banh-flan-4.jpg', 'Món bánh ngọt mềm mịn', 90, 'Trứng gà, sữa tươi, đường, vani', '1. Làm caramen. 2. Đổ hỗn hợp trứng sữa. 3. Hấp cách thủy.', 1, 1),
(22, 'Chè Thái', 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/174232/Originals/cach-lam-che-thai-5.jpg', 'Món chè trái cây thập cẩm', 30, 'Sầu riêng, trái cây, sữa, đá bào', '1. Cắt trái cây. 2. Trộn với sầu riêng và sữa. 3. Thêm đá bào.', 3, 1),
(23, 'Bánh Bông Lan', 'https://png.pngtree.com/thumb_back/fh260/background/20240408/pngtree-cheese-chiffon-slice-homemade-sponge-cake-with-grated-cheese-on-top-image_15650221.jpg', 'Món bánh mềm mịn dễ làm', 60, 'Bột mì, trứng, đường, bơ', '1. Trộn hỗn hợp bột. 2. Đổ khuôn. 3. Nướng bánh.', 3, 1),
(24, 'Sushi', 'https://img.pikbest.com/wp/202344/delight-assorted-japanese-rolls-and-sushi-a-scenic-display-of-culinary-delights-with-tantalizing-accoutrements_9906476.jpg!sw800', 'Món ăn đặc trưng của Nhật Bản', 50, 'Cơm, cá hồi, rong biển, dưa chuột', '1. Chuẩn bị cơm trộn giấm. 2. Cuốn sushi. 3. Cắt miếng.', 2, 1),
(25, 'Cà Ri Gà Thái', 'https://thegioianh.diendandoanhnghiep.vn/wp-content/uploads/2023/03/opt_aboutcom_coeus_resources_content_migration_simply_recipes_uploads_2019_01_butter_chicken_lead_2_6ca76f24bbe74114a09958073cb9c76f.jpg', 'Món cà ri thơm ngon đậm đà', 60, 'Gà, nước cốt dừa, cà rốt, khoai tây', '1. Xào gà. 2. Nấu cà ri với nước cốt dừa và rau củ. 3. Thêm gia vị.', 3, 1),
(26, 'Kimchi', 'https://www.monngon.tv/uploads/images/images/banh-kim-chi-1.jpg', 'Món ăn lên men nổi tiếng của Hàn Quốc', 180, 'Cải thảo, ớt bột, gừng, tỏi', '1. Sơ chế cải thảo. 2. Trộn gia vị. 3. Ủ lên men.', 2, 1),
(27, 'Spaghetti Carbonara', 'https://media.istockphoto.com/id/177413384/vi/anh/m%C3%AC-%E1%BB%91ng-v%E1%BB%9Bi-carbonara.jpg?s=612x612&w=0&k=20&c=z5qgrZPNrSQdfBLVfQ2DAXPHUsAvq4EPFPQ7G-vZV0Q=', 'Món mì Ý đơn giản mà ngon', 30, 'Mì Ý, trứng, phô mai, thịt xông khói', '1. Luộc mì. 2. Chuẩn bị nước sốt. 3. Trộn mì với nước sốt và thịt.', 2, 1),
(28, 'Bò Bít Tết', 'https://media.istockphoto.com/id/1363601737/vi/anh/th%E1%BB%8Bt-th%C4%83n-tr%C3%AAn-c%C3%B9ng-n%C6%B0%E1%BB%9Bng-ho%E1%BA%B7c-ch%C3%A9n-b%C3%ADt-t%E1%BA%BFt-th%E1%BB%8Bt-b%C3%B2-rump-tr%C3%AAn-b%E1%BA%A3ng-%C4%91%C3%A1-c%E1%BA%A9m-th%E1%BA%A1ch-n%E1%BB%81n-%C4%91en-d%E1%BA%A1ng.jpg?s=612x612&w=0&k=20&c=rxToR-kL1S2_Whl1Ti2PgHZvvpfqvid8hkTavT6_LM0=', 'Món ăn kiểu Âu sang trọng', 40, 'Thịt bò, khoai tây, rau cải, nước sốt', '1. Áp chảo thịt bò. 2. Chiên khoai tây. 3. Bày ra đĩa và rưới sốt.', 3, 1),
(29, 'Salad Caesar', 'https://media.istockphoto.com/id/534139231/vi/anh/g%C3%A0-n%C6%B0%E1%BB%9Bng-kh%E1%BB%8Fe-m%E1%BA%A1nh-caesar-salad.jpg?s=612x612&w=0&k=20&c=PMfPJFb4kDXFd8Vy4tl7YwgVHlqW96oAo-NRFewSiCY=', 'Món salad tươi mát', 20, 'Rau xà lách, gà, phô mai, nước sốt', '1. Trộn rau và gà. 2. Thêm nước sốt. 3. Trang trí với phô mai.', 3, 1),
(30, 'Đậu Hũ Sốt Cà', 'https://cdn.tgdd.vn/Files/2019/10/24/1211786/cach-lam-dau-hu-nhoi-thit-sot-ca-ngon-dam-da-cua-ban-thuy-hang-202202260940591871.jpg', 'Món chay ngon và dễ làm', 25, 'Đậu hũ, cà chua, hành lá', '1. Chiên đậu hũ. 2. Nấu sốt cà. 3. Rưới sốt lên đậu hũ.', 1, 1),
(31, 'Gỏi Ngó Sen', 'https://i0.wp.com/banhphongtomquangtran.com/wp-content/uploads/2021/02/cach-lam-goi-ngo-sen-tom-thit-ngon-mat-1.jpg?fit=800%2C600&ssl=1', 'Món khai vị chay hấp dẫn', 30, 'Ngó sen, cà rốt, đậu phộng, rau thơm', '1. Trộn ngó sen và rau. 2. Thêm nước mắm chay. 3. Rắc đậu phộng.', 2, 1),
(32, 'Chả Giò Chay', 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/163586/Originals/cach-lam-cha-gio%20(2).jpg', 'Món chả giò giòn rụm', 40, 'Bánh tráng, nấm, cà rốt, bún tàu', '1. Cuốn chả giò. 2. Chiên giòn. 3. Dùng kèm nước mắm chay.', 3, 1);

INSERT INTO `DANHGIA` (`MaDanhGia`, `MaNguoiDung`, `SoSao`, `NgayDanhGia`, `MaCongThuc`) VALUES
(2, 3, 5, '2025-01-10 13:18:27', 4);
INSERT INTO `DANHGIA` (`MaDanhGia`, `MaNguoiDung`, `SoSao`, `NgayDanhGia`, `MaCongThuc`) VALUES
(3, 3, 5, '2025-01-10 13:30:38', 19);
INSERT INTO `DANHGIA` (`MaDanhGia`, `MaNguoiDung`, `SoSao`, `NgayDanhGia`, `MaCongThuc`) VALUES
(5, 3, 5, '2025-01-10 13:30:50', 20);

INSERT INTO `DANHMUC` (`MaDanhMuc`, `TenDanhMuc`) VALUES
(1, 'Món ăn Việt Nam');
INSERT INTO `DANHMUC` (`MaDanhMuc`, `TenDanhMuc`) VALUES
(3, 'Đồ ngọt');
INSERT INTO `DANHMUC` (`MaDanhMuc`, `TenDanhMuc`) VALUES
(4, 'Món ăn Châu Á');
INSERT INTO `DANHMUC` (`MaDanhMuc`, `TenDanhMuc`) VALUES
(5, 'Món ăn Châu Âu'),
(6, 'Món ăn Chay');

INSERT INTO `KIEMDUYET` (`MaKiemDuyet`, `TenCongThuc`, `HinhAnh`, `MoTa`, `ThoiGianNau`, `NguyenLieu`, `CachLam`, `MaNguoiDung`, `TrangThai`, `NgayTao`, `MaDanhMuc`) VALUES
(2, 'Phở bò 3', NULL, 'Món ăn truyền thống Việt Nam, ngon tuyệt vời', 80, 'Thịt bò, bánh phở, rau thơm, ngò, quế, gia vị', 'Nấu nước dùng, luộc thịt, xào rau, vắt phở', 3, 'DangCho', '2025-01-06 15:37:06', 1);




INSERT INTO `USER` (`MaNguoiDung`, `TenNguoiDung`, `Email`, `MatKhau`, `VaiTro`) VALUES
(1, 'Nguyen Van A new', 'nguyenvana@example.com', '$2b$10$O2J6prJ6y0iOYyVu8xH9WOq.qMIRFgzSHnyZL82mh3eXSa5HuVl6i', 'User');
INSERT INTO `USER` (`MaNguoiDung`, `TenNguoiDung`, `Email`, `MatKhau`, `VaiTro`) VALUES
(2, 'Nguyễn Khánh Hưng new', 'nguyenkhanhhung@gmail.com', '$2b$10$cJunidz1NOfn9FH5ZqA3Z.uKmwLU3N74fzcZSXN3JH7Zt6X8kcFqG', 'User');
INSERT INTO `USER` (`MaNguoiDung`, `TenNguoiDung`, `Email`, `MatKhau`, `VaiTro`) VALUES
(3, 'Nguyễn Khánh Hưng 1', 'nguyenkhanhhung1@gmail.com', '$2b$10$hCrmUPxvlejuxgYVoAnUM.zrgvBQhtJ9uYChMT1KfpsIEUKPC662.', 'Admin');

INSERT INTO `YEUTHICH` (`MaYeuThich`, `MaNguoiDung`, `MaCongThuc`, `NgayYeuThich`) VALUES
(1, 2, 4, '2025-01-06 16:46:28');
INSERT INTO `YEUTHICH` (`MaYeuThich`, `MaNguoiDung`, `MaCongThuc`, `NgayYeuThich`) VALUES
(3, 2, 19, '2025-01-06 16:47:42');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;