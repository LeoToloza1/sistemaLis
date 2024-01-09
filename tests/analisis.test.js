import { examenEnUso } from "./tuArchivo";

describe("examenEnUso", () => {
  it("debería retornar true si el examen está en uso", async () => {
    // Aquí deberías configurar tu base de datos de prueba para que el examen con id 1 esté en uso

    const resultado = await examenEnUso(1);

    expect(resultado).toBe(true);
  });

  it("debería retornar false si el examen no está en uso", async () => {
    // Aquí deberías configurar tu base de datos de prueba para que el examen con id 2 no esté en uso

    const resultado = await examenEnUso(2);

    expect(resultado).toBe(false);
  });
});
