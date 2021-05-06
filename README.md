# Logysto prueba tecnica

Api rest nodejs con express, mongoDB, jwt. Permite crear usuarios, autenticar usuarios, refrescar token jwt, consultar usuarios creados y usuario unico, consultar geocode para direcciones con apis de tomtom y hereapi

## Comenzando 🚀

Clona la rama main del proyecto en tu local.

### Pre-requisitos 📋

Debes contar con lo siguiente:
 * Nodejs
 * mongoDB
 * git
 * postman

### Instalación 🔧

* Clonar en su local la rama main del proyecto una vez tenga preparado el ambiente.
* En la raiz del proyecto ejecutar npm i.
* Para correr el proyecto puede ejecutar npm run start:dev o npm start.
* la configuracion de puerto y base dedatos se puede modificar de ser neccesario en el archivo config.js en la raiz del proyecto.
* En la raiz del proyecto encontrar logystoV2 y logystoV21 que corresponden a las peticiones de postman que puede importar según la version que convenga.


## Ejecutando las pruebas ⚙️

* **Primero**, debes crear un usuario haciendo uso de la petición postman signup.
* **Segundo**, con el usuario y contraseña creada en el punto anterio hacer login en la aplicacion con la petición login, esto generará un token y un refreshToken, el primero tiene una vigencia de 15 minutos, esto para el efecto de las pruebas, con el refreshtoken puede obtener un token nuevo sin pasar por el login nuevamente, este ultimo tiene una vigencia de 7 dias o hasta que se use.
* **Tercero**, puede consultar el/los usuarios creados haciendo uso de la petición postman users o la de un usuario en particular con la peticion postman user, para ambos casos debe agregar en Authorization la opcion Bearer token y pegar el token que fue devuelto al momento del login.
* **Cuarto**, paraconsultar el geocoder debe hacer uso de la petición postman coordinates, esta peticion tambien requiere de autenticación, para esto enviar Authorization la opcion Bearer token y pegar el token que fue devuelto al momento del login.
* **Quinto**, si el token vence en el proceso, puede hacer uso de la petición postman refrestoken, en esta opcion debe enviar el refreshtoken que fue dispuesto en la respuesta del login.

## Autor ✒️

* **Julian Andres Vargas**
