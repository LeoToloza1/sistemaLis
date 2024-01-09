/*
 * referencias:
 * ✔️ - Finalizado
 * ⏳ - En proceso
 * ❌ - No realizado
 */
import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Estados from "./estados.js";
import Diagnostico from "./diagnostico.js";
import Muestras from "./muestras.js";
import Paciente from "./paciente.js";
import Usuario from "./usuario.js";
import Examen from "./examenes.js";
import Analisis from "./analisis.js";
class Orden extends Model {}
Orden.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
    },
    id_diagnostico: {
      type: DataTypes.INTEGER,
    },
    fechaResultados: {
      type: DataTypes.DATE,
    },
    observaciones: {
      type: DataTypes.STRING,
    },
    id_estado: {
      type: DataTypes.INTEGER,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "orden",
    tableName: "orden",
    timestamps: true,
  }
);
//una orden tiene 1 estado
Orden.belongsTo(Estados, { foreignKey: "id_estado" });
// una orden tiene 1 diagnostico
Orden.belongsTo(Diagnostico, { foreignKey: "id_diagnostico" });
// un estado puede estar asociado a varias ordenes
Estados.hasMany(Orden, { foreignKey: "id_estado" });
// un diagnostico puede estar asociado a varias ordenes
Diagnostico.hasMany(Orden, { foreignKey: "id_diagnostico" });
// una orden puede tener muchas muestras
Orden.hasMany(Muestras, { foreignKey: "id_orden" });
// una muestra le pertenece a una orden
Muestras.belongsTo(Orden, { foreignKey: "id_orden" });
// un paciente puede tener muchas ordenes
Paciente.hasMany(Orden, { foreignKey: "id_paciente" });
// una orden le pertenece a un solo paciente
Orden.belongsTo(Paciente, { foreignKey: "id_paciente" });
// una orden le pertenece a un solo usuario
Orden.belongsTo(Usuario, { foreignKey: "id_usuario" });
// un usuario puede tener muchas ordenes
Usuario.hasMany(Orden, { foreignKey: "id_usuario" });
// una orden puede tener muchos examenes
Orden.belongsToMany(Examen, { through: Analisis, foreignKey: "id_orden" });
Examen.belongsToMany(Orden, { through: Analisis, foreignKey: "id_examen" });

export default Orden;
