
//Seleccionamos el boton "ingresar" para hacer login
const boton_ingresar = document.getElementById('boton_ingresar');


//Asignamos al boton ingresar el evento que se ejecutarà al hacerle click.
boton_ingresar.addEventListener('click', login);

//Funcion: iniciar sesion
function login() {
    event.preventDefault();

    //Obtenemos los valores introducidos en los campos "Usuario" y "Clave" en el formulario de login.
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;


    //Validamos que los campos "usuario" y "clave" no esten vacìos.
    if (username == "" || username == null || password == "" || password == null) {
        alert('¡Debes ingresar todos los datos!');
    } else {
        generarToken(username, password);
    }
}

//Luego de ingresar el "usuario" y "clave" enviamos al edn point del back los datos para obtener el token de acceso y lo devolvemos al front.
function generarToken(username, password) {

    // Hacemos la solicitud al backend para generar el token
    fetch('http://localhost:8080/generate-token', {
        method: 'POST',  // Método HTTP para la solicitud
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido del cuerpo de la solicitud
        },
        // Se envian los datos de usuario y contraseña en el cuerpo de la solicitud
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json()) // Se convierte la respuesta a formato JSON
        .then(data => {

            if (data.token != null) {
                loginUser(data.token);
                /*alert("Inicio de sesion exitoso");*/
                console.log('Token recibido:', data.token);

            }
            else {
                alert("Inicio de sesion DENEGADO ");
            }
            // Aca se puede hacer algo con el token, como almacenarlo en el cliente o realizar otras acciones
        })
        .catch(error => {
            console.error('Error al generar el token:', error);
            alert("Inicio de sesion DENEGADO ");
        });
}

// Función para realizar una solicitud autenticada con token en la cabecera
function makeAuthenticatedRequest(url, options) {

    // Obtener el token del almacenamiento local
    const token = getToken();

    // Verificar si hay un token antes de realizar la solicitud
    if (token) {
        // Agregar el token a los encabezados de la solicitud
        options.headers['Authorization'] = `Bearer ${token}`;

        // Realizar la solicitud con fetch
        return fetch(url, options)
            .then(response => response.json())
            .catch(error => {
                console.error('Error en la solicitud autenticada:', error);
                throw error;
            });
    } else {
        // Manejar el caso en que no hay un token
        console.error('No hay token disponible. Inicie sesión primero.');
        return Promise.reject('No hay token disponible. Inicie sesión primero.');
    }
}

/*
// Evento de clic para el botón boton_usuario_actual
const boton_usuario_actual = document.getElementById('boton_usuario_actual');

boton_usuario_actual.addEventListener('click', function () {
    // Definir URL y opciones de solicitud
    const url = 'http://localhost:8080/actual-usuario';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // Llamar a la función makeAuthenticatedRequest solo cuando se hace clic en el botón
    makeAuthenticatedRequest(url, options)
        .then(data => {
            console.log('Datos recibidos:', data);
        })
        .catch(error => {
            console.error('Error en la solicitud principal:', error);
        });
});

*/
//Cuando iniciamos sesion establecemos el token en el localstorage.
function loginUser(token) {
    localStorage.setItem('token', token);
}

//Validamos la sesion cada vez que sea necesario
function isLoggedIn() {

    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
        return false;
    } else {
        return true;
    }
}

//Cerramos sesion y eliminamos el token del localstorage
function logoutUser(token) {
    localStorage.removeItem('token');
    return true;
}

//obtenemos el token
function getToken() {
    return localStorage.getItem('token');
}

//Establecemos el usuario
function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

//Obtenemos el usuario
function getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
        return JSON.parse(userStr);
    } else {
        this.logout();
        return null;
    }
}

//Obtenemos los roles
function getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
}


//probando probando

function traerStringDelBack() {
    // Hacemos la solicitud al backend para obtener el string
    fetch('http://localhost:8080/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud falló con el código ${response.status}`);
            }
            // Devolver la respuesta como texto
            return response.text();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
        })
        .catch(error => {
            console.error('Error al obtener el string del backend:', error.message);
        });
}

traerStringDelBack();

traerStringDelBack1();

function traerStringDelBack1() {
    // Hacemos la solicitud al backend para obtener el string
    fetch('http://localhost:8080/usuarios/home', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud falló con el código ${response.status}`);
            }
            // Devolver la respuesta como texto
            return response.text();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
        })
        .catch(error => {
            console.error('Error al obtener el string del backend:', error.message);
        });
}
