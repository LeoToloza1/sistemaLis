import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
class unidadMedida extends Model {}
unidadMedida.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    abreviatura: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "unidadMedida",
    tableName: "unidadMedida",
    timestamps: true,
  }
);
export default unidadMedida;
