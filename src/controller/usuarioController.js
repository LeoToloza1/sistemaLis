import Usuario from "../models/usuario.js";
export const registrarUsuario = async function (usuario) {
  try {
    const NuevoUsuario = Usuario.create(usuario);
    return NuevoUsuario;
  } catch (error) {
    return "error al crear nuevo usuario", error;
  }
};
export const editarUsuario = async function (usuario) {
  try {
    const usuarioActualizado = await Usuario.update(usuario, {
      where: { id: usuario.id },
    });
    return usuarioActualizado;
  } catch (error) {
    return "error al editar usuario", error;
  }
};

export const listarUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    return { error: "Error al cargar los usuarios" };
  }
};
