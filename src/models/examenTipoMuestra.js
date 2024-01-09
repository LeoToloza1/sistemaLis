import Examen from "./examenes.js";
import tipoMuestra from "./tipoMuestra.js";
import Conexion from "./config.js";
class examenTipoMuestra extends Model {}

examenTipoMuestra.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_examen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Examen,
        key: "id",
      },
    },
    id_tipoMuestra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: tipoMuestra,
        key: "id",
      },
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "examenTipoMuestra",
    timestamps: false,
  }
);

export default examenTipoMuestra;
