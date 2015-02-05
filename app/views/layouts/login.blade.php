<html>
  <head>
    @section('head')
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">      
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>      
      {{ HTML::script('js/tinymce/tinymce.min.js'); }}    
      {{ HTML::style('css/admin.css'); }}      
      {{ HTML::script('js/admin.js'); }}
       
    @show
  </head>
  <body>            
    <div class="container">                    
      <div class="row col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">        

        <h1 class="text-center" style="margin: 40px 0">DuckCMS<br/><small>Simple Website Management</small></h1>
        <div class="panel panel-primary">
          
          <div class="panel-heading">
            <h3 class="panel-title">Please Login</h3>
          </div>

          <div class="panel-body">
            @yield('content')      
          </div>

        </div>      
        
        @if(Session::has('alert-class'))
        <div class="alert {{ Session::get('alert-class') }}" role="alert">                
        @if(Session::has('alert-message'))
          {{ Session::get('alert-message') }}
        @endif          
        </div>
        @endif      


      </div>

    </div>  

    
    

  </body>
</html>