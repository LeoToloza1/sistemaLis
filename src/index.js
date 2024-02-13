/**
 * imporacion de dependencias:
 */
import express from "express";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer"; //cortar y pegar en el controlador y en el router
import passport from "passport";
import loginMiddleware from "./middleware/loginMiddleware.js";
import routerIndex from "./router/indexRouter.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import routerPaciente from "./router/pacienteRouter.js";
import routerCiudades from "./router/ciudadesRouter.js";
import routerExamen from "./router/examenRouter.js";
import usuarioRouter from "./router/usuarioRouter.js";
import estadoRouter from "./router/estadoRouter.js";
import valoresReferenciaRouter from "./router/valoresReferenciaRouter.js";
import determinacionRouter from "./router/deteminacionRouter.js";
import routerTipoMuestra from "./router/tipoMuestraRouter.js";
import routerUnidadMedida from "./router/unidadMedidaRouter.js";
import ordenRouter from "./router/ordenRouter.js";
import routerDiagnostico from "./router/diagnosticoRouter.js";
import muestrasRouter from "./router/muestrasRouter.js";
import routerAnalisis from "./router/analisisRouter.js";
import resultadoRouter from "./router/resultados.js";
import { configureSocket } from "./configSocket.js";
import http from "http";
import cors from "cors";
/**
 * configuarcion de express y socket io
 */
const app = express();
const server = http.createServer(app);
const io = configureSocket(server, {
  connectionStateRecovery: {
    enabled: true,
    maxAge: 30 * 60 * 1000,
  },
});
/**
 * configuracion de middlewares de express
 * express-session
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRETO));
app.use(
  expressSession({
    secret: process.env.SECRETO,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
  })
);
/**
 * configuaracion de passport
 */
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
/**
 * configuracion de pug y carpeta public
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/**
 * rutas
 */
app.use("/", routerIndex);
app.use("/", ordenRouter);
app.use("/", routerPaciente);
app.use("/", resultadoRouter);
app.use("/", loginMiddleware.ensureAuthenticated, routerCiudades);
app.use("/", loginMiddleware.ensureAuthenticated, routerExamen);
app.use("/", loginMiddleware.ensureAuthenticated, usuarioRouter);
app.use("/", loginMiddleware.ensureAuthenticated, estadoRouter);
app.use("/", loginMiddleware.ensureAuthenticated, determinacionRouter);
app.use("/", loginMiddleware.ensureAuthenticated, valoresReferenciaRouter);
app.use("/", loginMiddleware.ensureAuthenticated, routerTipoMuestra);
app.use("/", loginMiddleware.ensureAuthenticated, routerUnidadMedida);

app.use("/", loginMiddleware.ensureAuthenticated, routerDiagnostico);
app.use("/", loginMiddleware.ensureAuthenticated, muestrasRouter);
app.use("/", loginMiddleware.ensureAuthenticated, routerAnalisis);

server.listen(process.env.PORT, () => {
  console.log(`Corriendo en el puerto: ${process.env.PORT}`);
});

export default app;

/*
 * de aca para abajo hay que sacar todo
 */
// Configura Multer para guardar los archivos subidos en una carpeta llamada 'uploads'
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

//  Ruta para subir una imagen
// app.post("/upload", upload.single("image"), (req, res) => {
//   res.send("Imagen subida con éxito");
// });

// app.use(express.static(path.join(__dirname, "public")));

//  Para servir las imágenes subidas
// app.use("/uploads", express.static("uploads"));
