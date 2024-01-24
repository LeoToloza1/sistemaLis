import {
  buscarUsuario,
  buscarUsuarioPorId,
  comprobarPass,
} from "../controller/usuarioController.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(async function (email, password, done) {
    try {
      const usuario = await buscarUsuario({ email });
      if (email === usuario.email && password === usuario.password) {
        return done(null, usuario);
      } else {
        return done(null, false, { message: "Credenciales incorrectas" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

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
    console.log(req.body);
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
      return res.redirect("/index");
    });
  })(req, res, next);
};

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

export default { autenticado, ensureAuthenticated };
