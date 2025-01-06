import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BLACKLIST extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    MaBlacklist: {
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
    },
    LyDo: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Không phù hợp"
    },
    NgayChuyen: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    MaDanhMuc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'DANHMUC',
        key: 'MaDanhMuc'
      }
    }
  }, {
    sequelize,
    tableName: 'BLACKLIST',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaBlacklist" },
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
        name: "MaDanhMuc",
        using: "BTREE",
        fields: [
          { name: "MaDanhMuc" },
        ]
      },
    ]
  });
  }
}
