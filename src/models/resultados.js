import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Orden from "./orden.js";
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
    id_orden: {
      type: DataTypes.INTEGER,
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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "resultados",
    tableName: "resultados",
    timestamps: true,
  }
);

Orden.hasMany(Resultado, { foreignKey: "id_orden" });
Resultado.belongsTo(Orden, { foreignKey: "id_orden", as: "orden" });

Usuario.hasMany(Resultado, { foreignKey: "id_usuario" });
Resultado.belongsTo(Usuario, { foreignKey: "id_usuario" });

Determinacion.hasMany(Resultado, { foreignKey: "id_determinacion" });
Resultado.belongsTo(Determinacion, { foreignKey: "id_determinacion" });

export default Resultado;
