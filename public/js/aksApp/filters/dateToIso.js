// converts a mysql date to ISO format
// can do things in html files like:
// {{salesOrder.date_ordered | dateToISO | date:'mm/dd/yyyy'}}
aksApp.filter('dateToISO', function() {
    return function(input) {
        input = new Date(input).toISOString();
        return input;
    };
});