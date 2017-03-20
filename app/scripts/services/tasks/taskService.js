'user strict';

angular
    .module('uiApp')
    .service('taskService', function (globals) {

        return {
            getTasks: function(){
                return globals.getHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/tasks/');
            },
            createNewTask: function (task) {
                return globals.postHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/tasks/', task);
            },
            updateTask: function (task) {
                return globals.putHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/tasks/'+task.id + '/', task);
            },
            deleteTask: function(task){
                debugger;
                return globals.deleteHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/tasks/'+task.id + '/');
            }
        };
    });