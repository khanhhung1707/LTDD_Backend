import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _CONGTHUC from  "./CONGTHUC.js";
import _DANHGIA from  "./DANHGIA.js";
import _DANHMUC from  "./DANHMUC.js";
import _LICHSU from  "./LICHSU.js";
import _USER from  "./USER.js";

export default function initModels(sequelize) {
  const CONGTHUC = _CONGTHUC.init(sequelize, DataTypes);
  const DANHGIA = _DANHGIA.init(sequelize, DataTypes);
  const DANHMUC = _DANHMUC.init(sequelize, DataTypes);
  const LICHSU = _LICHSU.init(sequelize, DataTypes);
  const USER = _USER.init(sequelize, DataTypes);

  LICHSU.belongsTo(CONGTHUC, { as: "MaCongThuc_CONGTHUC", foreignKey: "MaCongThuc"});
  CONGTHUC.hasMany(LICHSU, { as: "LICHSUs", foreignKey: "MaCongThuc"});
  CONGTHUC.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(CONGTHUC, { as: "CONGTHUCs", foreignKey: "MaNguoiDung"});
  DANHGIA.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(DANHGIA, { as: "DANHGIa", foreignKey: "MaNguoiDung"});
  LICHSU.belongsTo(USER, { as: "MaNguoiDung_USER", foreignKey: "MaNguoiDung"});
  USER.hasMany(LICHSU, { as: "LICHSUs", foreignKey: "MaNguoiDung"});

  return {
    CONGTHUC,
    DANHGIA,
    DANHMUC,
    LICHSU,
    USER,
  };
}
