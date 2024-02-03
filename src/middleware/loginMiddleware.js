/*
 * referencias:
 * ✔️ - Finalizado
 * ⏳ - En proceso
 * ❌ - No realizado
 * ⚡ - urgente
 */
import {
  buscarUsuario,
  buscarUsuarioPorId,
  compararPass,
} from "../controller/usuarioController.js";
import { obtenerMensajes } from "../controller/mensajeController.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// ✔️ - Funciona
passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const usuario = await buscarUsuario({ email });
      if (usuario && email === usuario.email) {
        if (await compararPass(password, usuario.password)) {
          return done(null, usuario);
        } else {
          return done(null, false, { message: "Credenciales incorrectas" });
        }
      } else {
        return done(null, false, {
          message: "Correo electrónico no encontrado",
        });
      }
    } catch (error) {
      return done(error);
    }
  })
);
// ✔️ - Funciona
passport.serializeUser(async function (user, done) {
  try {
    const usuario = await buscarUsuarioPorId(user.id);
    done(null, usuario.id);
  } catch (error) {
    done(error);
  }
});
// ✔️ - Funciona
passport.deserializeUser(async function (id, done) {
  try {
    const usuario = await buscarUsuarioPorId(id);
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});

// ✔️ - Funciona
//quedamos en guardar los chat de la session y maejarlos en la base datos
export const autenticado = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const titulo2 = process.env.TITULO;
      const error = "Por favor verifique sus credenciales.";
      const mensaje = "Intente nuevamente";
      return res.render("login", {
        titulo2,
        error,
        mensaje,
      });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      req.session.usuario = user.dataValues;
      req.session.chats = await obtenerMensajes(user.id);
      req.session.save(() => {
        res.redirect("/index");
      });
    });
  })(req, res, next);
};
// ✔️ - Funciona
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
/**
 * simplificar y trabajar en los permisos
 */
// Middleware para administradores
export const permisoAdmin = (req, res, next) => {
  const rol = req.session.usuario.rol;
  if (rol !== "administrador") {
    console.log(`Acceso denegado porque es ${rol}`);
    return res.redirect("/accesoDenegado");
  }
  console.log(`Acceso completo porque es ${rol}`);
  return next();
};

// Middleware para prefesionales
export const permisoProfesional = (req, res, next) => {
  const rol = req.session.usuario.rol;
  if (rol !== "tecnico" && rol !== "bioquimico" && rol !== "administrador") {
    console.log(`Acceso denegado porque es ${rol}`);
    return res.redirect("/accesoDenegado");
  }
  console.log(`Acceso parcial porque es ${rol}`);
  return next();
};

export default {
  autenticado,
  ensureAuthenticated,
  permisoAdmin,
  permisoProfesional,
};
