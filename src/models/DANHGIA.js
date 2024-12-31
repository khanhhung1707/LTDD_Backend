import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DANHGIA extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    MaDanhGia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USER',
        key: 'MaNguoiDung'
      }
    },
    MaCongTrinh: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SoSao: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BinhLuan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    NgayDanhGia: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DANHGIA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaDanhGia" },
        ]
      },
      {
        name: "MaNguoiDung",
        using: "BTREE",
        fields: [
          { name: "MaNguoiDung" },
        ]
      },
    ]
  });
  }
}
