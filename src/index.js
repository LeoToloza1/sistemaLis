import express from "express";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer"; //cortar y pegar en el controlador y en el router
import routerIndex from "./router/indexRouter.js";
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
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//ruteo simple para index - es lo que vera el usuario del sistema
app.use("/", routerIndex);
app.use("/", routerPaciente);
app.use("/", routerCiudades);
app.use("/", routerExamen);
app.use("/", usuarioRouter);
app.use("/", estadoRouter);
app.use("/", determinacionRouter);
app.use("/", valoresReferenciaRouter);
app.use("/", routerTipoMuestra);
app.use("/", routerUnidadMedida);
app.use("/", ordenRouter);
app.use("/", routerDiagnostico);
app.use("/", muestrasRouter);
app.use("/", routerAnalisis);
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

// // Ruta para subir una imagen
// app.post("/upload", upload.single("image"), (req, res) => {
//   res.send("Imagen subida con éxito");
// });

// app.use(express.static(path.join(__dirname, "public")));

// // Para servir las imágenes subidas
// app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log(`Corriendo en el puerto: ${process.env.PORT}`);
});

export default app;
