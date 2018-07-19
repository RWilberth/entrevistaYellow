# Requerimientos de instalación

+ Instalar node js [Instalar](https://nodejs.org/en/download/)

+ Instalar MongoDB [Instalar](https://www.mongodb.com/download-center?jmp=tutorials#community)

+ Instalar sails **npm install sails -g**

Instalar mocha (en caso de que se requiera correr las pruebas automatizada) **npm install mocha -g**

Instalar [postman](https://www.getpostman.com/docs/v6/postman/launching_postman/installation_and_updates) o similar.

# Instalacion

Ingresa a la carpeta del proyecto mediante la linea de comandos y ejecuta el comando **npm install** 

# Ejecutar la aplicacion.

1. Abrir la linea de comandos ejecuar el comando mongodb.

2. Abrir una segunda linea de comandos ejecutar el comando sails lift

3. Abre el postman(o similar) para poder ejecutar cualquiera de los siguientes endpoints:
a. http://localhost:1337/:hash
b. http://localhost:1337/url/bulk

# Descripción de los endpoints

**a. /:hash**
## Descripción
Redirecciona a la url previamente insertada en el metodo b
## Peticion 
### Formato
/:hash
### Ejemplo
/hfwAmZhvqi
## Respuesta
Redireccionamiento a la url indicada


**b. /url/bulk**

## Descripción
Registra un conjunto de urls y retorna el conjunto de urls con sus respectivas claves para consultar
## Peticion
### Formato
[url, url, url]
### Ejemplo

```json
[
	"https://www.google.com/",
	"https://www.google.com/", 
	"https://sailsjs.com/docs/concepts/actions"
]
```

## Respuesta

### Formato
[{hash:string, url: string}, ...]
### Ejemplo 
```json
[
    {
        "hash": "hfwAmZhvqi",
        "url": "https://www.google.com/"
    },
    {
        "hash": "hfz0q1SpgM",
        "url": "https://www.google.com/"
    },
    {
        "hash": "hftKj7x224",
        "url": "https://sailsjs.com/docs/concepts/actions"
    }
]
```

# Testing
Para ejecutrar las pruebas previamente programadas ejecute el comando **mocha test/lifecycle.test.js test/integration/\*\*/*.test.js**