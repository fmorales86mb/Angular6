// Creo un prototipo por fuera para que lo puedan tomar las distintas funciones.
function Persona (nombre, apellido, edad)
{
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.nombreCompleto = this.nombre + ' ' + this.apellido;
}

// Función que se ejecuta al cargar la página.
(function(){
    
    console.log('pepe');



    // creo una variable del prototipo
    var p1 = new Persona('Federico', 'Morales', 33);
    
    // muestro la variable por consola
    console.log(p1.nombre);
    console.log(p1.apellido);
    console.log(p1.edad);
    console.log(p1.nombreCompleto);

})();

// función que se ejecuta al presionar el btnCargar.
function CargarPersona()
{    
    // Tomo los valores de los tb.
    var nombre = document.getElementById('txtNombre').value;
    var apellido = document.getElementById('txtApellido').value;
    var edad = document.getElementById('txtEdad').value;

    // Creo variable del prototipo Persona con los datos de los tb.
    var p2 = new Persona(nombre,apellido, edad);
    
    // Cargo dato generado por el prototipo en el tb de sólo lectura.
    document.getElementById('txtDatos').value = p2.nombreCompleto;
    
    // Imprimo por consola los datos para evaluar.
    console.log('Persona dos:');
    console.log(p2.nombre);
    console.log(p2.apellido);
    console.log(p2.edad);
    console.log(p2.nombreCompleto);    
}  