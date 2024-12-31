import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class CONGTHUC extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    MaCongThuc: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenCongThuc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MoTa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ThoiGianNau: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Thời gian nấu tính bằng phút"
    },
    NguyenLieu: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Danh sách nguyên liệu"
    },
    CachLam: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Các bước thực hiện"
    },
    MaNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USER',
        key: 'MaNguoiDung'
      }
    }
  }, {
    sequelize,
    tableName: 'CONGTHUC',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaCongThuc" },
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
