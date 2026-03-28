import path from "node:path";
import { writeFile, unlink } from "node:fs/promises";

export async function saveImage(image: File, route: string) {
  try {
    const buffer = Buffer.from(await image.arrayBuffer());

    const filename = Date.now() + "_" + image.name.replaceAll(" ", "_");
    const pathName = path.join(route, filename);
    await writeFile(path.join(process.cwd(), pathName), buffer);

    return pathName;
  } catch (error) {
    return "";
  }
}

export async function deleteImage(pathName: string) {
  // Eliminar el archivo de la carpeta public
  try {
    await unlink(pathName);
    console.log("Imagen eliminada con éxito: " + pathName);
  } catch (error) {
    console.log({ Error: `Error al eliminar la imagen: ${error}` });
    throw error;
  }
}
