import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
class Diagnostico extends Model {}
Diagnostico.init(
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
    detalle: {
      type: DataTypes.STRING,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "diagnostico",
    tableName: "diagnostico",
    timestamps: true,
  }
);
export default Diagnostico;
