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
    SoSao: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NgayDanhGia: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    MaCongThuc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CONGTHUC',
        key: 'MaCongThuc'
      }
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
      {
        name: "MaCongThuc",
        using: "BTREE",
        fields: [
          { name: "MaCongThuc" },
        ]
      },
    ]
  });
  }
}
