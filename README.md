# 🎬 Proyecto Backend FilmApp

Aplicación backend para gestionar una Film App con autenticación, roles, películas, favoritos, panel web y API REST documentada con Swagger.

El proyecto combina una interfaz web con **EJS** y una API construida con **Express**, usando **PostgreSQL** para usuarios/favoritos y **MongoDB** para almacenar películas.

## ✨ Funcionalidades

- 🔐 Registro, login, logout y recuperación/cambio de contraseña.
- 👤 Gestión de perfil de usuario.
- 🛡️ Roles `user` y `admin`.
- 🎥 Búsqueda y detalle de películas desde OMDb y MongoDB.
- ⭐ Gestión de películas favoritas.
- 🧑‍💼 Panel de administración para usuarios y películas.
- 📚 Documentación de API disponible con Swagger.
- 🧪 Tests con Jest.
- 🐳 Docker Compose para levantar PostgreSQL.

## 🧰 Tecnologías

- 🟢 Node.js
- ⚡ Express 5
- 🖼️ EJS
- 🐘 PostgreSQL
- 🍃 MongoDB + Mongoose
- 🧩 Sequelize
- 🔑 JSON Web Token
- 🍪 Cookie Parser
- 📖 Swagger UI
- 🧪 Jest
- 🐳 Docker

## 📁 Estructura del proyecto

```text
.
├── src
│   ├── app.js                    # Configuración principal de Express
│   ├── server.js                 # Arranque del servidor
│   ├── config                    # Configuración de DB, cookies y Swagger
│   ├── controllers               # Lógica de controladores web y API
│   ├── middlewares               # Auth, roles y manejo de errores
│   ├── models                    # Modelos SQL y MongoDB
│   ├── public                    # Archivos estáticos
│   ├── routes                    # Rutas web y API
│   ├── services                  # Lógica de negocio e integraciones
│   ├── validators                # Validaciones
│   └── views                     # Vistas EJS
├── test                          # Tests unitarios
├── create-tables.js              # Script auxiliar para crear tablas SQL
├── docker-compose.yml            # Servicio de PostgreSQL
├── package.json
└── README.md
```

## 🚀 Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con una configuración similar:

```env
NODE_ENV=development

# PostgreSQL
DB_NAME=movie_app
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

# MongoDB
MONGO_URI=mongodb://localhost:27017/filmapp
ACCESS_TOKEN_SECRET=tu_clave_secreta
OMDB_API_KEY=tu_api_key_de_omdb
```

> 📌 Nota: `MONGO_URI`, `ACCESS_TOKEN_SECRET` y `OMDB_API_KEY` son necesarios para que la app funcione correctamente.

## 🐳 Base de datos con Docker

El proyecto incluye un `docker-compose.yml` para levantar PostgreSQL:

```bash
docker compose up -d
```

Esto crea un contenedor con:

- 🐘 Base de datos: `movie_app`
- 👤 Usuario: `postgres`
- 🔑 Password: `postgres`
- 🔌 Puerto: `5432`

Para crear las tablas SQL con Sequelize:

```bash
node create-tables.js
```

## ▶️ Scripts disponibles

```bash
npm run dev
```

Arranca el servidor en modo desarrollo con `node --watch`.

```bash
npm start
```

Arranca el servidor en modo normal.

```bash
npm test
```

Ejecuta los tests con Jest.

## 🌐 Rutas web principales

- 🏠 `GET /` - Página de inicio
- 🔑 `GET /login` - Login
- 📝 `GET /signup` - Registro
- 📊 `GET /dashboard` - Dashboard privado
- 👤 `GET /profile` - Perfil del usuario
- 🎬 `GET /movies` - Listado/búsqueda de películas
- 🎞️ `GET /movies/:id` - Detalle de película
- ⭐ `GET /favorites` - Favoritos del usuario
- 👥 `GET /admin/users` - Administración de usuarios
- 🎥 `GET /admin/movies` - Administración de películas

## 📡 API REST

Todas las rutas de API cuelgan de `/api`.

### 🔐 Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `PUT /api/auth/restorepassword`

### 👤 Users

- `GET /api/users`
- `PUT /api/users`
- `GET /api/users/all`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### 🎬 Movies

- `GET /api/movies/random`
- `GET /api/movies/search`
- `GET /api/movies/search/:title`
- `GET /api/movies`
- `POST /api/movies`
- `PUT /api/movies/:id`
- `DELETE /api/movies/:id`

### ⭐ Favorites

- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites/:id`

## 📚 Documentación Swagger

Con el servidor arrancado, la documentación de la API está disponible en:

```text
http://localhost:3000/api/docs
```

## 🧪 Tests

Ejecuta la suite de tests con:

```bash
npm test
```

Actualmente el proyecto incluye tests para servicios y controladores de películas.

## 🔑 Roles

- 👤 `user`: puede acceder a películas, búsquedas y favoritos.
- 🛡️ `admin`: puede gestionar usuarios y películas desde API y panel web.

## 👨‍💻 Autor

Proyecto desarrollado como práctica de backend para una Film App.
