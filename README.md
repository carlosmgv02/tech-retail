# SCE - Prac 1

Este documento describe los pasos necesarios para configurar y ejecutar la aplicación de comercio electrónico, incluyendo el frontend, el backend y la base de datos.
## Pre-requisitos

Asegúrate de tener instalado lo siguiente en tu sistema:
- Node.js (Preferiblemente la última versión LTS)
- npm (Se instala con Node.js)
- Docker
- Git (Opcional, para clonar el repositorio)
## Clonar el Repositorio

Si tienes el código en un repositorio, puedes clonarlo usando:

```bash
git clone <url-del-repositorio>
cd ecommerce-app
```



Si no usas Git, asegúrate de tener el código fuente disponible en tu entorno local.
## Configuración de la Base de Datos

Utilizamos Docker para levantar una instancia de PostgreSQL. Ejecuta el siguiente comando para crear y arrancar el contenedor de Docker:

```bash
docker run --name ecommerce-db -e POSTGRES_USER=tu_usuario -e POSTGRES_PASSWORD=tu_contraseña -e POSTGRES_DB=ecommerce -p 5432:5432 -d postgres
```



Este comando configura un contenedor de PostgreSQL con el usuario, contraseña y base de datos necesarios para el proyecto.
## Configuración del Backend
### Instalación de Dependencias

Desde el directorio raíz del proyecto:

```bash
cd backend
npm install
```


### Variables de Entorno

Crea un archivo `.env` en el directorio `backend` y agrega las siguientes variables de entorno:

```plaintext
DATABASE_URL=postgres://tu_usuario:tu_contraseña@localhost:5432/ecommerce
JWT_SECRET=tu_secreto_jwt
```



Asegúrate de reemplazar `tu_usuario`, `tu_contraseña` y `tu_secreto_jwt` con tus valores reales.
### Iniciar el Servidor

Para iniciar el servidor backend en el puerto 4000:

```bash
npm start
```


## Configuración del Frontend
### Instalación de Dependencias

Desde el directorio raíz del proyecto:

```bash
cd frontend
npm install
```


### Iniciar la Aplicación

Para iniciar el servidor frontend en el puerto 3000:

```bash
npm start
```



La aplicación debería estar ahora accesible en `http://localhost:3000`.
## Uso de la Aplicación