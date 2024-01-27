import {
  buscarUsuario,
  buscarUsuarioPorId,
  compararPass,
} from "../controller/usuarioController.js";
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
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.usuario = user.dataValues;
      req.session.save(() => {
        res.redirect("/index");
      });
    });
  })(req, res, next);
};

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    const usuario = req.session.usuario;

    if (usuario) {
      if (
        usuario.permiso >= 1 &&
        (usuario.rol === "administrador" || usuario.rol === "tecnico")
      ) {
        return next();
      } else {
        return res
          .status(403)
          .send("Acceso prohibido. No tienes permisos suficientes.");
      }
    }
  }

  res.redirect("/");
};

export default { autenticado, ensureAuthenticated };
