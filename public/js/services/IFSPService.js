angular.module('ifsp').factory('Contato', function($resource) {	
	return $resource('/contatos/:id');
});
