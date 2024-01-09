import { Model, DataTypes } from "sequelize";
import Conexion from "./config.js";
import Ciudad from "./ciudad.js";
import Estados from "./estados.js";
class Usuario extends Model {}

Usuario.init(
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
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permiso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_ciudad: {
      type: DataTypes.INTEGER,
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
    },
    id_estado: {
      type: DataTypes.INTEGER,
    },
    //experimental - agregar foto de perfil
    imagenPerfil: {
      type: DataTypes.STRING,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: Conexion.sequelize,
    modelName: "usuario",
    tableName: "usuario",
    timestamps: true,
  }
);
Usuario.belongsTo(Ciudad, { foreignKey: "id_ciudad" });
Ciudad.hasMany(Usuario, { foreignKey: "id_ciudad" });

Usuario.belongsTo(Estados, { foreignKey: "id_estado" });
Estados.hasMany(Usuario, { foreignKey: "id_estado" });

Usuario.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Usuario, { foreignKey: "id_usuario" });
export default Usuario;
