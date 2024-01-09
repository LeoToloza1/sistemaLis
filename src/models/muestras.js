import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import tipoMuestra from "./tipoMuestra.js";
import Paciente from "./paciente.js";
// import Orden from "./orden.js";
import Usuario from "./usuario.js";
class Muestras extends Model {}
Muestras.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tipoMuestra: {
      type: DataTypes.STRING,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
    },
    id_orden: {
      type: DataTypes.INTEGER,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "muestras",
    tableName: "muestras",
    timestamps: true,
  }
);
tipoMuestra.hasMany(Muestras, { foreignKey: "id_tipoMuestra" });
Muestras.belongsTo(tipoMuestra, { foreignKey: "id_tipoMuestra" });

Paciente.hasMany(Muestras, { foreignKey: "id_paciente" });
Muestras.belongsTo(Paciente, { foreignKey: "id_paciente" });

// Orden.hasMany(Muestras, { foreignKey: "id_orden" });
// Muestras.belongsTo(Orden, { foreignKey: "id_orden" });

Muestras.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Muestras, { foreignKey: "id_usuario" });
export default Muestras;
