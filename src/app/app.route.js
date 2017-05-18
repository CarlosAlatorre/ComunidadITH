"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login/login.component');
var home_component_1 = require('./components/home/home.component');
var app_routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
exports.app_routing = router_1.RouterModule.forRoot(app_routes, { useHash: true });
//# sourceMappingURL=app.route.js.map