 <!-- Fixed navbar -->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation" ng-show="isUserLoggedIn()">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#/dashboard">AKS Portal</a>
            </div>

        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <!--
                <li ng-class="{ active: isActive('/purchase-orders')}"><a href="#/purchase-orders">Purchase Orders</a></li>
                <li ng-class="{ active: isActive('/orders')}"><a href="#/orders">Orders</a></li>
                -->
                <li ng-class="{ active: isActive('/vendors')}"><a href="#/vendors">Vendors</a></li>
                <li ng-class="{ active: isActive('/customers')}"><a href="#/customers">Customers</a></li>
                <!-- <li><a href="#/employees">Employees</a></li> -->
            </ul>


            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" >
                    <a class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> @{{getDisplayName()}} <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#/user/@{{ getUserId() }}">Edit Profile</a></li>
                        <li><a href="#/user-change-password/@{{ getUserId() }}">Change Password</a></li>
                        <li role="presentation" class="divider"></li>
                        <li><a href="#" ng-click="logout()">Logout</a></li>
                    </ul>
                </li>
            </ul>

        </div><!--/.nav-collapse -->
      </div>
    </div>