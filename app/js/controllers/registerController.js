/**
 * Created by Toshiba on 27/12/2016.
 */
CITH
  .controller('registerCtrl', ['$firebaseArray', 'alertService',
    function($firebaseArray, alertService, $sessionStorage, $localStorage ){

      //public var and function
      var vm = this;
      vm.user = '';
      vm.email = '';
      vm.password = '';
      vm.verifyPassword = '';

      //public functions
      vm.registerAccount = registerAccount;

      //private functions
      function activate() {

      }
      activate();

      function registerAccount(accountType) {
        switch (accountType){

          case 'FACEBOOK':
            var provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
              var token = result.credential.accessToken;
              var user = result.user;
              firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  location.href = '#/crearNoticias';
                }
              });
            }).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
            });

            break;

          case 'GOOGLE':
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
              var token = result.credential.accessToken;
              var user = result.user;
              firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  location.href = '#/crearNoticias';
                }
              });
            }).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
            });
            break;

          case 'EMAIL':
            if(vm.password == vm.verifyPassword){
              firebase.auth().createUserWithEmailAndPassword(vm.email, vm.password).then(function () {
                alertService.complete('Registro completado', '')
                //Iniciamos sesion
                firebase.auth().signInWithEmailAndPassword(vm.email, vm.password).then(function () {
                  //Comprobamos si está autenticado
                  firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        location.href = '#/crearNoticias';
                    }
                  });
                }).catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(error, ' no autenticado')
                });
              }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                switch (errorCode) {
                  case 'auth/email-already-in-use':
                    alertService.error('Email ya en uso', 'Intenta con uno diferente');
                    break;
                  case 'auth/invalid-email':
                    alertService.error('Email invalido', 'Escribe un email valido');
                    break;
                  case 'auth/operation-not-allowed':
                    alertService.error('Operacion no permitida', 'Ponte en contacto con los administradores de la pagina');
                    break;
                  case 'auth/weak-password':
                    alertService.error('Contraseña muy debil', 'Escribe una contraseña dificil de adivinar');
                    break;
                }
              });


            }else{
              alertService.error('Contraseña no coincide', 'Verifica que las contraseñas sean iguales');
            }
            break;
        }
      }

    }]);
