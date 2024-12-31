import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LICHSU extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    MaLichSu: {
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
    MaCongThuc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CONGTHUC',
        key: 'MaCongThuc'
      }
    },
    ThoiGianXem: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'LICHSU',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaLichSu" },
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
