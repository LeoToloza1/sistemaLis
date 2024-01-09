import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import valoresReferencia from "./valoresReferencia.js";
import Estados from "./estados.js";
import unidadMedida from "./unidadMedida.js";
import Usuario from "./usuario.js";
class Determinacion extends Model {}
Determinacion.init(
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
    id_estado: {
      type: DataTypes.INTEGER,
    },
    id_valoresReferencia: {
      type: DataTypes.INTEGER,
    },
    id_unidadMedida: {
      type: DataTypes.INTEGER,
    },
    observaciones: {
      type: DataTypes.STRING(250),
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "determinacion",
    tableName: "determinacion",
    timestamps: true,
  }
);
Estados.hasMany(Determinacion, { foreignKey: "id_estado" });
Determinacion.belongsTo(Estados, { foreignKey: "id_estado" });

valoresReferencia.hasMany(Determinacion, {
  foreignKey: "id_valoresReferencia",
});
Determinacion.belongsTo(valoresReferencia, {
  foreignKey: "id_valoresReferencia",
  as: "valoresReferencia",
});

unidadMedida.hasMany(Determinacion, { foreignKey: "id_unidadMedida" });
Determinacion.belongsTo(unidadMedida, { foreignKey: "id_unidadMedida" });

Determinacion.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Determinacion, { foreignKey: "id_usuario" });
export default Determinacion;
