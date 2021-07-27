import fs from 'fs/promises';

class Archivo {
  constructor(nomArchivo) {
    this.nomArchivo = nomArchivo;
		this.elementos = [];
	}

	async guardar(title, price, thumbnail) {
		try {
			
			if (typeof title !== 'string') throw new Error('Titulo tiene que ser string');
			if (typeof price !== 'number') throw new Error('Price tiene que ser un nro');
			if (typeof thumbnail !== 'string') throw new Error('Thumbnail tiene que ser string de url'); 
			
			let elemento = {
				title: title,
				price: price,
				thumbnail: thumbnail,
				id: this.elementos.length + 1,
			}
			this.elementos.push(elemento);

			await fs.writeFile(this.nomArchivo, JSON.stringify(this.elementos, null, '\t'));
			console.log(`Producto ${title} agregado a ${this.nomArchivo}`);
			} catch (error) {
				console.log('ERROR: No se pudo agregar un producto. ' + error.message);
			}
	
	}

	async leer() {
		try {
			const leerArchivo = await fs.readFile(this.nomArchivo, 'utf-8');
			console.log(leerArchivo);
		} catch (error) {
			console.log(this.elementos);
		}
	}

	async borrar() {
		try {
			await fs.unlink(this.nomArchivo);
			console.log(`El archivo ${this.nomArchivo} fue borrado`);
		 } catch (error) {
			 console.log('No se pudo borrar el archivo');
		}
	}
}

const productos = new Archivo('productos.txt');
productos.guardar('Escuadra', 123.45, 'thumbnail": "https://es.wikipedia.org/wiki/Escuadra#/media/Archivo:Squadra_45.jpg');
productos.guardar('Calculadora', 234.56, 'https://es.wikipedia.org/wiki/Calculadora#/media/Archivo:Casio_fx-85WA_20050529.jpg');
productos.guardar('Globo Terraqueo', 345.67, 'https://es.wikipedia.org/wiki/Globo_terr%C3%A1queo#/media/Archivo:GlobeSK.jpg');
productos.guardar('Traeme el error', 458.35, 666);
productos.leer();
productos.borrar();
