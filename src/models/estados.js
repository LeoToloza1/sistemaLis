import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
class Estados extends Model {}
Estados.init(
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
    modelName: "estados",
    tableName: "estados",
    timestamps: false,
  }
);
export default Estados;
