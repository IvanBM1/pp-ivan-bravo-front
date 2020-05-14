let app = angular.module('miAplicacion', [])

app.controller('miControlador', function($scope, $http) {

    $scope.agregarUsuario = {
        data: {
            genero: 'Masculino'
        },
        mensaje: '',
        enviar: agregarUsuario
    }

    $scope.mostrarUsuarios = {
        data: []
    }

    $scope.buscarUsuarios = {
        nombre: '',
        enviar: solicitarUsuarios
    }

    $scope.borrarUsuario = borrarUsuario

    consultarUsuarios()
    
    function agregarUsuario() {

        const usuario = $scope.agregarUsuario.data

        $http.post('http://localhost:8080/usuario', usuario).then(resp => {

            const nuevo_usuario = resp.data
            
            $scope.agregarUsuario.mensaje = 'Usuario agregado: '+ nuevo_usuario.nombre

            $scope.mostrarUsuarios.data.push(nuevo_usuario)

        }).catch(err => {

            $scope.agregarUsuario.mensaje = 'Error al agregar usuario'

        })
    }

    function consultarUsuarios() {

        $http.get('http://localhost:8080/usuarios').then(resp => {

            $scope.mostrarUsuarios.data = resp.data

        }).catch(err => {

            $scope.mostrarUsuarios.mensaje = 'Error al consultar usuarios'

        })
    }

    function solicitarUsuarios(event) {

        if(event && event.keyCode != 13)
            return

        const nombre = $scope.buscarUsuarios.nombre

        $http.get('http://localhost:8080/usuarios?nombre='+ nombre).then(resp => {
            
            $scope.mostrarUsuarios.data = resp.data

        }).catch(err => {

            $scope.mostrarUsuarios.mensaje = 'Error al consultar usuarios'

        })
    }
    
    function borrarUsuario(usuario_id) {

        const usuarios = $scope.mostrarUsuarios.data

        $http.delete('http://localhost:8080/usuario/'+ usuario_id).then(resp => {
            
            $scope.mostrarUsuarios.data = filtrarUsuario(usuarios, usuario_id)

        })
    }

    function filtrarUsuario(usuarios, usuario_id) {
        return usuarios.filter(usuario => usuario._id != usuario_id)
    }
})