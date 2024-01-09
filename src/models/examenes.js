import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Estados from "./estados.js";
import Determinacion from "./determinacion.js";
import Usuario from "./usuario.js";
import tipoMuestra from "./tipoMuestra.js";
class Examen extends Model {}
Examen.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    codigo: {
      type: DataTypes.STRING(10),
    },
    id_estado: {
      type: DataTypes.INTEGER,
    },
    tiempo: {
      type: DataTypes.INTEGER,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "examen",
    tableName: "examenes",
    timestamps: true,
  }
);

Estados.hasMany(Examen, { foreignKey: "id_estado" });
Examen.belongsTo(Estados, { foreignKey: "id_estado" });

Examen.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Examen, { foreignKey: "id_usuario" });

Examen.belongsToMany(Determinacion, {
  through: "examenDeterminacion",
  as: "determinacion",
  foreignKey: "id_examen",
});
Determinacion.belongsToMany(Examen, {
  through: "examenDeterminacion",
  as: "determinacion",
  foreignKey: "id_determinacion",
});

Examen.belongsToMany(tipoMuestra, {
  through: "examenTipoMuestra",
  foreignKey: "id_examen",
});

tipoMuestra.belongsToMany(Examen, {
  through: "examenTipoMuestra",
  foreignKey: "id_tipoMuestra",
});

export default Examen;
