import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class YEUTHICH extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    MaYeuThich: {
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
    NgayYeuThich: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'YEUTHICH',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaYeuThich" },
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
