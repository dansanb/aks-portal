<html ng-app="aksApp">
  <head>
    @section('head')
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    {{ HTML::script('js/libs/jquery.min.js');}}
    {{ HTML::script('js/libs/bootstrap.min.js'); }}
    {{ HTML::script('js/libs/angular.min.js'); }}
    {{ HTML::script('js/libs/angular-route.min.js'); }}
    {{ HTML::script('js/libs/ngDialog.min.js'); }}
    {{ HTML::script('js/all.js'); }}

    {{ HTML::style('css/bootstrap.min.css'); }}
    {{ HTML::style('css/bootstrap-theme.min.css'); }}
    {{ HTML::style('css/ngDialog.css'); }}
    {{ HTML::style('css/ngDialog-theme-default.css'); }}

    {{ HTML::style('css/style.css'); }}



    @show

  </head>
  <body>            


    <div class="container">
        <div ng-controller="HeaderController">
            @include('layouts.navigation')
            <div class="alert alert-@{{ getFlashAlertType() }}" ng-show="getFlashMessage()">
                <span class="glyphicon glyphicon-info-sign"></span> @{{ getFlashMessage() }}
                <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            </div>
        </div>

      @yield('content')
    </div>

  </body>
</html>