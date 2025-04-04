# Backend - Express Server

En este archivo se documenta el backend del proyecto `higherOrLower`, construido con Node.js y Express. Proporciona las rutas API y la lógica del servidor para el juego Higher or Lower.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del directorio del backend:

```bash
npm install
```

## Ejecutar el Servidor

Para iniciar el servidor de desarrollo, utiliza el siguiente comando:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`.

## Rutas API

### GET /api

Endpoint de prueba para confirmar que el servidor está funcionando.

#### Respuesta

```json
{
  "message": "Hello from Express + MongoDB!"
}
```

### POST /api/register

Registra un nuevo usuario. Se comprueba si el usuario ya existe buscando su nombre de usuario y contraseña. También se hace un hash de la contraseña usando bcrypt. Y por último se añade la imagen por defecto en la tabla de imágenes de perfil.

#### Cuerpo de la Solicitud

```json
{
  "username": "nombre_usuario",
  "email": "correo@ejemplo.com",
  "password": "contraseña"
}
```

#### Respuesta Exitosa

```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "username": "nombre_usuario",
    "email": "correo@ejemplo.com",
    "profilePicture": "profile_1.png"
  }
}
```

#### Respuesta de Error

- **400 Bad Request**: El nombre de usuario o email ya está en uso.

```json
{
  "message": "El nombre de usuario o email ya está en uso"
}
```

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor"
}
```

### POST /api/login

Inicia sesión un usuario existente. Se busca al usuario por su *nickname*, se usa bcrypt para comparar que la contraseña es correcta ya que se hasheó en el registro, además en este proceso se busca en la tabla de imagen de perfil para que una vez haya entrado en el menú principal de la aplicación, su icono ya sea visible en la barra lateral; si no encuentra su foto de perfil, sale la imagen por defecto.

#### Cuerpo de la Solicitud

```json
{
  "username": "nombre_usuario",
  "password": "contraseña"
}
```

#### Respuesta Exitosa

```json
{
  "message": "Usuario logueado exitosamente",
  "user": {
    "username": "nombre_usuario",
    "email": "correo@ejemplo.com",
    "profilePicture": "profile_1.png"
  }
}
```

#### Respuesta de Error

- **400 Bad Request**: Todos los campos son obligatorios.

```json
{
  "message": "Todos los campos son obligatorios"
}
```

- **404 Not Found**: Usuario no encontrado.

```json
{
  "message": "Usuario no encontrado"
}
```

- **401 Unauthorized**: Contraseña incorrecta.

```json
{
  "message": "Contraseña incorrecta"
}
```

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor"
}
```

### PUT /api/changeIcon

Cambia el icono de perfil del usuario. Como la foto de perfil seleccionada actúa como un string, se actualiza este campo de texto por el nombre de la nueva foto.

#### Cuerpo de la Solicitud

```json
{
  "username": "nombre_usuario",
  "profileImage": "nombre_de_la_imagen.png"
}
```

#### Respuesta Exitosa

```json
{
  "message": "Usuario actualizado exitosamente",
  "user": {
    "username": "nombre_usuario",
    "profileImage": "nombre_de_la_imagen.png"
  }
}
```

#### Respuesta de Error

- **400 Bad Request**: Faltan datos.

```json
{
  "message": "Faltan datos"
}
```

- **404 Not Found**: Usuario no encontrado.

```json
{
  "message": "Usuario no encontrado"
}
```

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor"
}
```

### PUT /api/changePassword

Cambia la contraseña del usuario. Para comprobar la contraseña actual si es correcta es necesario usar bcrypt ya que se guarda con un hasheo. Asimismo, la nuevo contraseña también será hasheada.

#### Cuerpo de la Solicitud

```json
{
  "username": "nombre_usuario",
  "currentPassword": "contraseña_actual",
  "newPassword": "nueva_contraseña"
}
```

#### Respuesta Exitosa

```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

#### Respuesta de Error

- **400 Bad Request**: Faltan datos: username, currentPassword y newPassword son obligatorios.

```json
{
  "message": "Faltan datos: username, currentPassword y newPassword son obligatorios."
}
```

- **404 Not Found**: Usuario no encontrado.

```json
{
  "message": "Usuario no encontrado."
}
```

- **400 Bad Request**: La contraseña actual es incorrecta.

```json
{
  "message": "La contraseña actual es incorrecta."
}
```

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor."
}
```

### PUT /api/updateMangaScore

Actualiza la mejor puntuación de manga del usuario. En caso de que la puntuación que llega al endpoint sea menor que la que se ha guardado en la base de datos, no se actualizará la nota. Si es la primera vez que se ha jugado en la aplicación, el campo de la mejor puntuación de anime se pondrá un valor 0 para evitar nulos.

#### Cuerpo de la Solicitud

```json
{
  "username": "nombre_usuario",
  "score": 100
}
```

#### Respuesta Exitosa

```json
{
  "message": "Puntuación actualizada exitosamente",
  "score": {
    "bestMangaScore": 100
  }
}
```

#### Respuesta de Error

- **400 Bad Request**: Faltan datos: username y score son obligatorios.

```json
{
  "message": "Faltan datos: username y score son obligatorios"
}
```

- **404 Not Found**: Usuario no encontrado.

```json
{
  "message": "Usuario no encontrado"
}
```

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor"
}
```

### PUT /api/updateAnimeScore

Actualiza la mejor puntuación de anime del usuario. En caso de que la puntuación que llega al endpoint sea menor que la que se ha guardado en la base de datos, no se actualizará la nota. Si es la primera vez que se ha jugado en la aplicación, el campo de la mejor puntuación de manga se pondrá un valor 0 para evitar nulos.

#### Cuerpo de la Solicitud

```json
{
  "username": "nombre_usuario",
  "score": 100
}
```

#### Respuesta Exitosa

```json
{
  "message": "Puntuación actualizada exitosamente",
  "score": {
    "bestAnimeScore": 100
  }
}
```

#### Respuesta de Error

- **400 Bad Request**: Faltan datos: username y score son obligatorios.

```json
{
  "message": "Faltan datos: username y score son obligatorios"
}
```

- **404 Not Found**: Usuario no encontrado.

```json
{
  "message": "Usuario no encontrado"
}
```

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor"
}
```

### GET /api/getUserScore

Obtiene las puntuaciones del usuario. Para ello obtiene los valores relacionados con su perfil de la tabla de puntuaciones. En caso de que el usuario no haya jugado aún pero haya entrado en su perfil, tendría valores nulos, así que se devuelven valores predeterminados de 0 para mejor puntuación de anime y manga. 

#### Parámetros de Consulta

```json
{
  "username": "nombre_usuario"
}
```

#### Respuesta Exitosa

```json
{
  "message": "Puntuaciones obtenidas exitosamente",
  "scores": {
    "bestMangaScore": 100,
    "bestAnimeScore": 100
  }
}
```

#### Respuesta de Error

- **400 Bad Request**: El nombre de usuario es obligatorio.

```json
{
  "message": "El nombre de usuario es obligatorio"
}
```

- **404 Not Found**: Usuario no encontrado.

```json
{
  "message": "Usuario no encontrado"
}
```

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor"
}
```

### GET /api/getMangaLeaderboard

Obtiene la tabla de clasificación de manga. Busca hasta un máximo de 5 personas que tengan puntuación en la categoría de manga en orden descendente. Además, se buscan las imágenes de perifl relacionadas con el usuario.

#### Respuesta Exitosa

```json
{
  "message": "Leaderboard de manga obtenido exitosamente",
  "leaderboard": [
    {
      "position": 1,
      "username": "nombre_usuario",
      "score": 100,
      "profileImage": "assets/profilePictures/profile_1.png"
    },
    ...
  ]
}
```

#### Respuesta de Error

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor"
}
```

### GET /api/getAnimeLeaderboard

Obtiene la tabla de clasificación de anime. Busca hasta un máximo de 5 personas que tengan puntuación en la categoría de anime en orden descendente. Además, se buscan las imágenes de perifl relacionadas con el usuario.

#### Respuesta Exitosa

```json
{
  "message": "Leaderboard de anime obtenido exitosamente",
  "leaderboard": [
    {
      "position": 1,
      "username": "nombre_usuario",
      "score": 100,
      "profileImage": "assets/profilePictures/profile_1.png"
    },
    ...
  ]
}
```

#### Respuesta de Error

- **500 Internal Server Error**: Error en el servidor.

```json
{
  "message": "Error en el servidor"
}
```