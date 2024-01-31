import Usuario from "../models/usuario.js";
import bcrypt, { hash } from "bcrypt";
// import { Resend } from "resend";
import { z } from "zod";
import Ciudad from "../models/ciudad.js";
import Estados from "../models/estados.js";

async function hashearPass(pass) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
}

export async function compararPass(passActual, passHash) {
  return await bcrypt.compare(passActual, passHash);
}

const rolesEnum = {
  nombre: "rol",
  values: ["administrador", "usuario", "tecnico", "bioquimico"],
};
const permisosEnum = {
  nombre: "permiso",
  values: ["1", "2", "3", "4"],
};
const UsuarioSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  dni: z.string(),
  telefono: z.number(),
  email: z.string().email().min(5),
  password: z.string().min(8),
  rol: z.enum(rolesEnum.values),
  permiso: z.enum(permisosEnum.values),
  direccion: z.string().optional(),
  id_ciudad: z.array(z.number()),
  nacimiento: z.string().optional(),
  id_estado: z.number().optional(),
  imagenPerfil: z.string().optional(),
  id_usuario: z.number().optional(),
});

export const registrarUsuario = async function (usuario) {
  try {
    const validatedUsuario = UsuarioSchema.parse(usuario);
    const nuevoPass = await hashearPass(validatedUsuario.password);
    const usuarioExistente = await Usuario.findOne({
      where: {
        email: validatedUsuario.email,
      },
    });
    if (usuarioExistente) {
      return { error: "El correo electrónico ya está en uso" };
    }
    const NuevoUsuario = await Usuario.create({
      ...validatedUsuario,
      password: nuevoPass,
    });
    return NuevoUsuario;
  } catch (error) {
    console.error("Error al crear nuevo usuario:", error.message);
    return { error: error.message };
  }
};

export const editarUsuario = async function (usuario) {
  try {
    const actualizarUsuario = await Usuario.findByPk(usuario.id);
    if (!actualizarUsuario) {
      return { error: "Usuario no encontrado" };
    } else {
      const validatedUsuario = UsuarioSchema.parse(usuario);
      const nuevoPass = await hashearPass(validatedUsuario.password);
      const usuarioEditado = await Usuario.update(
        {
          ...validatedUsuario,
          password: nuevoPass,
        },
        {
          where: { id: usuario.id },
        }
      );
      return { mensaje: "Usuario actualizado exitosamente" };
    }
  } catch (error) {
    console.error("Error al editar usuario:", error.message);
    return { error: "Error al editar usuario", mensaje: error.message };
  }
};

function recuperarPass() {
  const resend = new Resend("re_TN3tfsC8_JxCteKAaraEY7J9BkvVnhrFA");
  resend.apiKeys.create({ name: "Production" });
  (async function () {
    const { data, error } = await resend.emails.send({
      from: "LIS <admin@sistema.lis.com>",
      to: ["leotoloza6@gmail.com"],
      subject: "recuperar contraseña:",
      html: "<strong>Hola Mundo</strong>",
    });
    if (error) {
      return console.error({ error });
    }
    console.log({ data });
  })();
}

export const listarUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        {
          model: Ciudad,
          attributes: ["nombre"],
        },
        {
          model: Estados,
          attributes: ["nombre"],
        },
      ],
    });
    return usuarios;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    return { error: "Error al cargar los usuarios" };
  }
};

export const buscarUsuario = async (datosUsuario) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: { email: datosUsuario.email },
    });
    if (!usuarioEncontrado) {
      throw new Error("Usuario no encontrado");
    }
    return usuarioEncontrado;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return { error: "Error al buscar usuario" };
  }
};

export const buscarUsuarioPorId = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    return usuario;
  } catch (error) {
    console.error("Error al buscar usuario por ID:", error);
    throw error;
  }
};
