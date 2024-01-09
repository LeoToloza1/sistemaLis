import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Orden from "./orden.js";
import Examen from "./examenes.js";
import Estados from "./estados.js";
import Muestras from "./muestras.js";

class Analisis extends Model {}
Analisis.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_orden: {
      type: DataTypes.INTEGER,
    },
    id_examen: {
      type: DataTypes.INTEGER,
    },
    id_estado: {
      type: DataTypes.INTEGER,
    },
    descripcion: {
      type: DataTypes.STRING(250),
    },
    id_muestra: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "analisis",
    tableName: "analisis",
    timestamps: true,
  }
);

Examen.hasMany(Analisis, { foreignKey: "id_examen" });
Analisis.belongsTo(Examen, { foreignKey: "id_examen" });

Estados.hasMany(Analisis, { foreignKey: "id_estado" });
Analisis.belongsTo(Estados, { foreignKey: "id_estado" });

Muestras.hasMany(Analisis, { foreignKey: "id_muestra" });
Analisis.belongsTo(Muestras, { foreignKey: "id_muestra" });

export default Analisis;
