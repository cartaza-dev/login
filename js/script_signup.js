
class Usuario {
    constructor(name, username, password, email, enabled) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}


//Seleccionamos el boton "Registarse" para hacer login
boton_registro = document.getElementById('boton_registro');

//Asignamos al boton Registarse el evento que se ejecutarà al hacerle click.
boton_registro.addEventListener('click', signup);


function signup(event) {

    event.preventDefault();

    // Obtener los valores introducidos en el formulario de Registro.
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Crear una instancia de la clase Usuario
    const miUsuario = new Usuario(name, username, password, email);
    /*
        // Hacer la solicitud al backend para guardar el usuario
        fetch('http://localhost:8080/usuarios/guardarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(miUsuario),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            // Puedes realizar acciones adicionales después de recibir la respuesta del servidor
          
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            alert("NO SE HA GENERADO EL REGISTRO. VERIFICA LOS DATOS INGRESADOS");
        });
    }
    
    */
    fetch('http://localhost:8080/usuarios/guardarUsuario', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(miUsuario),
})
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            //Seleccionamos el div vacìo para añadirle mensaje de registro exitoso.
            registro_exitoso = document.getElementById('registro_exitoso');
            registro_exitoso.textContent = "Te has registrado correctamente. Recibiràs un correo para validar tu cuenta.";
        } else {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error.message);
        registro_fallido = document.getElementById('registro_fallido');
        registro_fallido.textContent = "No te has registrado correctamente. Revisa los datos ingresados.";
    });
    

    formulario = document.getElementById('formulario');
    
    // Limpiamos el formulario
    formulario.reset();
}