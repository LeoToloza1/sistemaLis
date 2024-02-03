import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Usuario from "./usuario.js";

class Mensaje extends Model {}

Mensaje.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
    mensaje: {
      type: DataTypes.TEXT,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "Mensaje",
    tableName: "mensaje",
    timestamps: false,
  }
);

Mensaje.belongsTo(Usuario, { foreignKey: "id_usuario" });

export default Mensaje;
