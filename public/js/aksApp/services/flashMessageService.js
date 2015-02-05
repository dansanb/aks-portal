/*
    Flash message service

    Used to send flash notifications across redirects.

 */
aksApp.service("flashMessageService", function($rootScope) {
    var messageQueue = [];
    var alertQueue = [];

    var currentMessage = "";
    var currentAlertType = "";

    $rootScope.$on("$routeChangeSuccess", function() {
        currentMessage = messageQueue.shift() || "";
        currentAlertType = alertQueue.shift() || "";
    });

    // public API.
    return({
        setMessage: setMessage,
        getMessage: getMessage,
        getAlertType: getAlertType
    });


    function setMessage(message, type) {
        messageQueue.push(message);
        alertQueue.push(type);
    }
    function getMessage() {
        return currentMessage;
    }

    function getAlertType() {
        return currentAlertType;
    }
});