import Conexion from "./config.js";
import { Model, DataTypes } from "sequelize";
class Provincia extends Model {}

Provincia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "provincia",
    tableName: "provincia",
    timestamps: true,
  }
);
export default Provincia;
