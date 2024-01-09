import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Usuario from "./usuario.js";
class tipoMuestra extends Model {}
tipoMuestra.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "tipoMuestra",
    tableName: "tipoMuestra",
    timestamps: true,
  }
);
tipoMuestra.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(tipoMuestra, { foreignKey: "id_usuario" });
export default tipoMuestra;
