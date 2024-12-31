import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class USER extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    MaNguoiDung: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenNguoiDung: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "Email"
    },
    MatKhau: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    VaiTro: {
      type: DataTypes.ENUM('Admin','User'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'USER',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaNguoiDung" },
        ]
      },
      {
        name: "Email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
    ]
  });
  }
}
