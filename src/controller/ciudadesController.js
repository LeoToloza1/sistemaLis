import Ciudad from "../models/ciudad.js";
import Provincia from "../models/provincia.js";

export const listarCiudades = async () => {
  try {
    const ciudades = await Ciudad.findAll({
      include: {
        model: Provincia,
        attributes: ["nombre"],
      },
    });
    return ciudades;
  } catch (error) {
    console.error("Error al cargar las ciudades:", error);
    return { error: "Error al cargar las ciudades" };
  }
};
