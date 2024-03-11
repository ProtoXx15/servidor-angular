
# Servidor JS con BBDD en JSON
Este repositorio contiene un servidor Express JS simple que utiliza una base de datos basada en JSON para el almacenamiento de datos. El servidor está diseñado para manejar solicitudes de API RESTful e interactuar con un archivo JSON para realizar operaciones CRUD.

## Instrucciones de Configuración
Sigue estos pasos para configurar y ejecutar el servidor:
1. ### Clona el repositorio:
```bash
git clone https://github.com/ProtoXx15/servidor-angular.git
```
2. ### Instala las Dependencias:
```bash
cd angular-final-servidor
npm install
```
2. ### Inicia el Servidor:
```bash
node server.js
```
 ## Descripción del Servidor
- Tecnología Utilizada: Este servidor se ha construido empleando Express JS, un framework web rápido, minimalista y sin opiniones diseñado para Node.js.
- Almacenamiento de Datos: Los datos se gestionan mediante un archivo JSON (data.json) y se manipulan mediante operaciones estándar de entrada/salida de archivos.
- API RESTful: El servidor ofrece una API RESTful que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en los datos almacenados en el archivo JSON.
 ## Listado de Endpoints Disponibles
- GET /usuarios: Recupera todos los datos almacenados en la base de datos.
- POST /usuarios/data: Añade nuevos datos a la base de datos.
 -DELETE /usuarios/{id}: Elimina datos con un ID específico de la base de datos.
 ## Datos de Muestra
- El archivo JSON (db.json) incluye ejemplos de datos para fines de demostración. Puedes editar directamente este archivo o utilizar los endpoints proporcionados para interactuar con los datos.

- Este README proporciona una visión general de la estructura y funcionalidad del servidor. Para obtener detalles sobre cómo configurar, desplegar y mantener este servidor, consulta la sección correspondiente en este documento o sigue las instrucciones proporcionadas en el repositorio.
