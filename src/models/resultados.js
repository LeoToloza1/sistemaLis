import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Estados from "./estados.js";
import Usuario from "./usuario.js";
import Determinacion from "./determinacion.js";

class Resultado extends Model {}
Resultado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_determinacion: {
      type: DataTypes.INTEGER,
    },
    resultado: {
      type: DataTypes.FLOAT,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "resultado",
    tableName: "resultado",
    timestamps: true,
  }
);

Estados.hasMany(Resultado, { foreignKey: "id_estado" });
Resultado.belongsTo(Estados, { foreignKey: "id_estado" });

Usuario.hasMany(Resultado, { foreignKey: "id_usuario" });
Resultado.belongsTo(Usuario, { foreignKey: "id_usuario" });

Determinacion.hasMany(Resultado, { foreignKey: "id_determinacion" });
Resultado.belongsTo(Determinacion, { foreignKey: "id_determinacion" });

export default Resultado;
