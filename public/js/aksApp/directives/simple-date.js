angular.module("aksApp").directive("simpleDate", function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function(data) {
                //convert data from view format to model format
                return data; //converted
            });

            ngModelController.$formatters.push(function(data) {
                //convert data from model format to view format
                return moment(data).format("MMMM D, YYYY");
            });
        }
    };
});