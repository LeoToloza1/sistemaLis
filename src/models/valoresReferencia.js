import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
class valoresReferencia extends Model {}
valoresReferencia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    genero: {
      type: DataTypes.STRING,
    },
    edadMin: {
      type: DataTypes.INTEGER,
    },
    edadMax: {
      type: DataTypes.INTEGER,
    },
    valorMin: {
      type: DataTypes.FLOAT,
    },
    valorMax: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "valoresReferencia",
    tableName: "valoresReferencia",
    timestamps: true,
  }
);
export default valoresReferencia;
