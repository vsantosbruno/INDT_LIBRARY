angular.module("Livros", ['ngRoute', 'ngResource', 'lbServices', 'ngAnimate', 'ui.bootstrap', 'toastr']).controller("LivrosController", function ($scope, Livro, $uibModal, $location, toastr) {

  $scope.livroFind = '';

  $scope.init = function () {
    var filter = {"where": {"titulo": {"regexp": "^" + $scope.livroFind + "/i"}}};

    Livro.find({filter: filter},
      function (list) {
        $scope.livros = list;
      });
  }

  $scope.init();

  // ##### SHOW LIVRO
  $scope.show = function (id) {

    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modalShow.html',
      controllerAs: '$ctrl',
      controller: function ($uibModalInstance, livro) {
        var $ctrl = this;
        $ctrl.livro = livro;
        $ctrl.ok = function () {
          $uibModalInstance.dismiss('cancel');
        };
      },
      resolve: {
        livro: function () {
          return Livro.findById({
              id: id
            }
          );
        }
      }
    });
  };

  // ##### UPDATE LIVRO
  $scope.update = function (id) {

    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modalForm.html',
      controllerAs: '$ctrl',
      controller: function ($uibModalInstance, Livro, dataLivro) {
        var $ctrl = this;

        $ctrl.livro = dataLivro

        $ctrl.ok = function () {
          $uibModalInstance.dismiss('cancel');
        };

        $ctrl.save = function () {
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
            }
          );
        }
      }
    });
  };

  // ##### CREATE LIVRO
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
          Livro.create($ctrl.livro,
            function (value, responseHeaders) {
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

  // ##### DELETE LIVRO
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


