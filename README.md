# Logysto prueba tecnica

Api rest nodejs con express, mongoDB, jwt. Permite crear usuarios, autenticar usuarios, refrescar token jwt, consultar usuarios creados y usuario unico, consultar geocode para direcciones con apis de tomtom y hereapi

## Comenzando 馃殌

Clona la rama main del proyecto en tu local.

### Pre-requisitos 馃搵

Debes contar con lo siguiente:
 * Nodejs
 * mongoDB
 * git
 * postman

### Instalaci贸n 馃敡

* Clonar en su local la rama main del proyecto una vez tenga preparado el ambiente.
* En la raiz del proyecto ejecutar npm i.
* Para correr el proyecto puede ejecutar npm run start:dev o npm start.
* la configuracion de puerto y base dedatos se puede modificar de ser neccesario en el archivo config.js en la raiz del proyecto.
* En la raiz del proyecto encontrar logystoV2 y logystoV21 que corresponden a las peticiones de postman que puede importar seg煤n la version que convenga.


## Ejecutando las pruebas 鈿欙笍

* **Primero**, debes crear un usuario haciendo uso de la petici贸n postman signup.
* **Segundo**, con el usuario y contrase帽a creada en el punto anterio hacer login en la aplicacion con la petici贸n login, esto generar谩 un token y un refreshToken, el primero tiene una vigencia de 15 minutos, esto para el efecto de las pruebas, con el refreshtoken puede obtener un token nuevo sin pasar por el login nuevamente, este ultimo tiene una vigencia de 7 dias o hasta que se use.
* **Tercero**, puede consultar el/los usuarios creados haciendo uso de la petici贸n postman users o la de un usuario en particular con la peticion postman user, para ambos casos debe agregar en Authorization la opcion Bearer token y pegar el token que fue devuelto al momento del login.
* **Cuarto**, paraconsultar el geocoder debe hacer uso de la petici贸n postman coordinates, esta peticion tambien requiere de autenticaci贸n, para esto enviar Authorization la opcion Bearer token y pegar el token que fue devuelto al momento del login.
* **Quinto**, si el token vence en el proceso, puede hacer uso de la petici贸n postman refrestoken, en esta opcion debe enviar el refreshtoken que fue dispuesto en la respuesta del login.

## Autor 鉁掞笍

* **Julian Andres Vargas**
