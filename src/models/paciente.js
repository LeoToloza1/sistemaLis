import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Ciudad from "./ciudad.js";
import Usuario from "./usuario.js";

class Paciente extends Model {}
Paciente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.INTEGER,
    },
    telefono: {
      type: DataTypes.INTEGER,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    ciudadId: {
      type: DataTypes.INTEGER,
    },
    nacimiento: {
      type: DataTypes.DATE,
    },
    embarazo: {
      type: DataTypes.BOOLEAN,
    },
    usuarioId: {
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
    modelName: "paciente",
    tableName: "paciente",
    timestamps: true,
  }
);
Paciente.belongsTo(Ciudad, { foreignKey: "ciudadId" });
Ciudad.hasMany(Paciente, { foreignKey: "ciudadId" });
Paciente.belongsTo(Usuario, { foreignKey: "usuarioId" });
Usuario.hasMany(Paciente, { foreignKey: "usuarioId" });

export default Paciente;
