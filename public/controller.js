angular.module('ecommerce').controller('mainCtrl', function($scope, mainService) {

  $scope.newProduct = {};

  function getProducts() {
    mainService.getProducts().then(function(res) {
      $scope.products = res.data;
    });
  };

  getProducts();

  $scope.addProduct = function() {
    mainService.postProduct($scope.newProduct).then(function(res) {
      getProducts();
    });
    $scope.newProduct = {};
  };

  $scope.update = function(product) {
    mainService.updateProduct(product).then(function(res) {
      getProducts();
    });
  };

});