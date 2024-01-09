import Examen from "./examenes.js";
import Determinacion from "./determinacion.js";
import Conexion from "./config.js";
class examenDeterminacion extends Model {}

examenDeterminacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_examen: {
      type: DataTypes.INTEGER,
      references: {
        model: Examen,
        key: "id",
      },
    },
    id_determinacion: {
      type: DataTypes.INTEGER,
      references: {
        model: Determinacion,
        key: "id",
      },
    },
  },
  {
    sequelize: Conexion,
    modelName: "examendeterminacion",
    timestamps: false,
  }
);
export default examenDeterminacion;
