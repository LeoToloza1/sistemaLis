import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Provincia from "./provincia.js";
class Ciudad extends Model {}

Ciudad.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_provincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "ciudad",
    tableName: "ciudad",
    timestamps: false,
  }
);
Ciudad.belongsTo(Provincia, { foreignKey: "id_provincia" });
Provincia.hasMany(Ciudad, { foreignKey: "id_provincia" });

export default Ciudad;
