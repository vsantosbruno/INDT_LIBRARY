angular.module("Livros").controller("LivrosController", function ($scope, Livro, $uibModal, $location, toastr) {

  $scope.livroFind = '';

  $scope.init = function () {
    var filter =  {"where": {"titulo": {"regexp": "^"+$scope.livroFind+"/i"}}} ;

    Livro.find({filter : filter},
      function (list) {
        $scope.livros = list;
      },
      function (errorResponse) {
      }
    );
  }

  $scope.init();

  $scope.show = function (id) {

    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modalShow.html',
      controller: 'modalShowController',

      controllerAs: '$ctrl',
      resolve: {
        livro: function () {
          return Livro.findById({
              id: id
            },
            function (list) {
            },
            function (errorResponse) {
            }
          );
        }
      }
    });
  };

  $scope.update = function (id) {

    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modalForm.html',
      controllerAs: '$ctrl',
      controller: function ($uibModalInstance, Livro, dataLivro) {
        var $ctrl = this;

        $ctrl.livro = dataLivro
        console.log($ctrl.livro)

        $ctrl.ok = function () {
          $uibModalInstance.dismiss('cancel');
        };

        $ctrl.save = function () {
          console.log("Salvando");
          console.log($ctrl.livro)
          Livro.updateAll(
            {
              where: {
                id: $ctrl.livro.id
              }
            },
            $ctrl.livro,
            function (value, responseHeaders) {
              toastr.success('Livro Atualizado.', 'Sucesso!!');
              $scope.init()
            },
            function (errorResponse) {
              var message = '';
              angular.forEach(errorResponse.data.error.details.messages, function (value, key) {
                message = key + ': ' + value[0];
              });
              toastr.error(message, 'Ops!!');
            }
          );
          $uibModalInstance.dismiss('cancel');
        };

      },
      resolve: {
        dataLivro: function () {

          return Livro.findById({
              id: id
            },
            function (list) {
            },
            function (errorResponse) {
            }
          );
        }
      }
    });
  };

  $scope.create = function () {

    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modalForm.html',
      controllerAs: '$ctrl',
      controller: function ($uibModalInstance, Livro) {
        var $ctrl = this;
        $ctrl.livro = {};

        $ctrl.ok = function () {
          $uibModalInstance.dismiss('cancel');
        };

        $ctrl.save = function () {
          console.log("Salvando");
          console.log($ctrl.livro)
          Livro.create($ctrl.livro,
            function (value, responseHeaders) {
              console.log("Item Salvo!")
              $scope.init()
              $uibModalInstance.dismiss('cancel');
              toastr.success('Livro Cadastrado com Sucesso.', 'Sucesso!!');
            },
            function (errorResponse) {
              var message = '';
              angular.forEach(errorResponse.data.error.details.messages, function (value, key) {
                message = key + ': ' + value[0];
              });
              toastr.error(message, 'Ops!!');
            }
          );
        };
      },
    });
  };

  $scope.delete = function (id) {
    Livro.deleteById({
      id: id
    }).$promise
      .then(function () {
        toastr.success('Livro Excluído.', 'Sucesso!!');
        $scope.init()
      });
  }


});

// angular.module("Livros").controller("ModalController", function ($scope, $uibModal, $log, $document, Livro) {
//   var $ctrl = this;
//
//   $ctrl.items = ['item1', 'item2', 'item3'];
//
//   $ctrl.animationsEnabled = true;
//
//   $ctrl.open = function (id) {
//
//     var modalInstance = $uibModal.open({
//       animation: $ctrl.animationsEnabled,
//       ariaLabelledBy: 'modal-title',
//       ariaDescribedBy: 'modal-body',
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl',
//       controllerAs: '$ctrl',
//       appendTo: undefined,
//       resolve: {
//         items: function () {
//           return $ctrl.items;
//         },
//         livro: function () {
//           return Livro.findById({
//               id: 1
//             },
//             function (list) { /* success */
//             },
//             function (errorResponse) { /* error */
//             }
//           );
//         }
//       }
//     });
//   };
//
// });


angular.module('Livros').controller('modalShowController', function ($uibModalInstance, livro) {
  var $ctrl = this;

  $ctrl.livro = livro;

  $ctrl.ok = function () {
    $uibModalInstance.dismiss('cancel');

  };

  $ctrl.edit = function () {
    console.log("Editando");
    // $uibModalInstance.dismiss('cancel');
  };
});

angular.module('Livros').controller('modalSaveController', function ($uibModalInstance, livro, Livro) {
  var $ctrl = this;

  $ctrl.livro = {};

  $ctrl.ok = function () {
    $uibModalInstance.dismiss('cancel');

  };

  $ctrl.save = function () {
    console.log("Salvando");
    console.log($ctrl.livro)

    Livro.create($ctrl.livro,
      function (value, responseHeaders) {
        console.log("Item Salvo!")
        $scope.init()
      },
      function (errorResponse) {
        console.log("ERROR")
      }
    );
    // $uibModalInstance.dismiss('cancel');
  };
});
