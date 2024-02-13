import Usuario from "../models/usuario.js";
import bcrypt, { hash } from "bcrypt";
import { z } from "zod";
import nodemailer from "nodemailer";
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
  values: ["Administrador", "Usuario", "Tecnico", "Bioquimico"],
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

/**
 * tengo que hacer el portal del usuario para que descargue el pdf de los resultados
 * la recuperacion de contraseña no se va hacer
 * el envio de mail tampoco se va a realizar
 */

export async function enviarMail(usuario) {
  const nuevaPass = await asignarNuevaPass(usuario);
  try {
    // Configuración del transportador SMTP
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_MAIL,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.ID_CLIENT,
        clientSecret: process.env.SECRET_CLIENT,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    // Opciones del correo electrónico
    let mailOptions = {
      from: '"SISTEMA LIS" <leotoloza@gmail.com>',
      to: usuario.email,
      subject: "Reestablecimiento de Contraseña",
      html: `
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333; font-family: Arial, sans-serif;">Tu contraseña ha sido reestablecida</h2>
          <p style="color: #666; font-family: Arial, sans-serif;">Hola ${usuario.nombre},</p>
          <p style="color: #666; font-family: Arial, sans-serif;">Hemos recibido una solicitud para reestablecer tu contraseña en el Sistema LIS.</p>
          <p style="color: #666; font-family: Arial, sans-serif;">Tu nueva contraseña es: <strong>${nuevaPass}</strong></p>
          <p style="color: #666; font-family: Arial, sans-serif;">Por favor, asegúrate de guardar tu nueva contraseña en un lugar seguro.</p>
          <p style="color: #666; font-family: Arial, sans-serif;">Si no solicitaste este cambio, por favor ignora este mensaje o ponte en contacto con nuestro equipo de soporte.</p>
          <p style="color: #666; font-family: Arial, sans-serif;">Gracias,</p>
          <p style="color: #666; font-family: Arial, sans-serif;">El Equipo de Sistema LIS</p>
        </div>
      `,
    };

    // Envío del correo electrónico
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info.response);
    return true;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
}
async function asignarNuevaPass(usuario) {
  try {
    const { password } = usuario;
    const usuarioBuscado = await buscarUsuario(usuario);
    const nuevaPassHasheada = await hashearPass(password);
    await Usuario.update(
      { password: nuevaPassHasheada },
      {
        where: {
          id: usuarioBuscado.id,
        },
      }
    );
    return password;
  } catch (error) {
    console.log("Hubo un error al actualizar la contraseña -->", error);
    throw new Error("Error al actualizar la contraseña");
  }
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
