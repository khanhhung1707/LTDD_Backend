import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _BLACKLIST from  "./BLACKLIST.js";
import _CONGTHUC from  "./CONGTHUC.js";
import _DANHGIA from  "./DANHGIA.js";
import _DANHMUC from  "./DANHMUC.js";
import _KIEMDUYET from  "./KIEMDUYET.js";
import _LICHSU from  "./LICHSU.js";
import _USER from  "./USER.js";
import _YEUTHICH from  "./YEUTHICH.js";

export default function initModels(sequelize) {
  const BLACKLIST = _BLACKLIST.init(sequelize, DataTypes);
  const CONGTHUC = _CONGTHUC.init(sequelize, DataTypes);
  const DANHGIA = _DANHGIA.init(sequelize, DataTypes);
  const DANHMUC = _DANHMUC.init(sequelize, DataTypes);
  const KIEMDUYET = _KIEMDUYET.init(sequelize, DataTypes);
  const LICHSU = _LICHSU.init(sequelize, DataTypes);
  const USER = _USER.init(sequelize, DataTypes);
  const YEUTHICH = _YEUTHICH.init(sequelize, DataTypes);

  DANHGIA.belongsTo(CONGTHUC, { as: "MaCongThuc_CONGTHUC", foreignKey: "MaCongThuc"});
  CONGTHUC.hasMany(DANHGIA, { as: "DANHGIa", foreignKey: "MaCongThuc"});
  LICHSU.belongsTo(CONGTHUC, { as: "MaCongThuc_CONGTHUC", foreignKey: "MaCongThuc"});
  CONGTHUC.hasMany(LICHSU, { as: "LICHSUs", foreignKey: "MaCongThuc"});
  YEUTHICH.belongsTo(CONGTHUC, { as: "MaCongThuc_CONGTHUC", foreignKey: "MaCongThuc"});
  CONGTHUC.hasMany(YEUTHICH, { as: "YEUTHICHes", foreignKey: "MaCongThuc"});
  BLACKLIST.belongsTo(DANHMUC, { as: "MaDanhMuc_DANHMUC", foreignKey: "MaDanhMuc"});
  DANHMUC.hasMany(BLACKLIST, { as: "BLACKLISTs", foreignKey: "MaDanhMuc"});
  CONGTHUC.belongsTo(DANHMUC, { as: "MaDanhMuc_DANHMUC", foreignKey: "MaDanhMuc"});
  DANHMUC.hasMany(CONGTHUC, { as: "CONGTHUCs", foreignKey: "MaDanhMuc"});
  KIEMDUYET.belongsTo(DANHMUC, { as: "MaDanhMuc_DANHMUC", foreignKey: "MaDanhMuc"});
  DANHMUC.hasMany(KIEMDUYET, { as: "KIEMDUYETs", foreignKey: "MaDanhMuc"});
  BLACKLIST.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(BLACKLIST, { as: "BLACKLISTs", foreignKey: "MaNguoiDung"});
  CONGTHUC.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(CONGTHUC, { as: "CONGTHUCs", foreignKey: "MaNguoiDung"});
  DANHGIA.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(DANHGIA, { as: "DANHGIa", foreignKey: "MaNguoiDung"});
  KIEMDUYET.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(KIEMDUYET, { as: "KIEMDUYETs", foreignKey: "MaNguoiDung"});
  LICHSU.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(LICHSU, { as: "LICHSUs", foreignKey: "MaNguoiDung"});
  YEUTHICH.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(YEUTHICH, { as: "YEUTHICHes", foreignKey: "MaNguoiDung"});

  return {
    BLACKLIST,
    CONGTHUC,
    DANHGIA,
    DANHMUC,
    KIEMDUYET,
    LICHSU,
    USER,
    YEUTHICH,
  };
}
