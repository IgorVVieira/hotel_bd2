/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from 'views/Dashboard';
import UserProfile from 'views/UserProfile';
import FormQuarto from 'views/FormQuarto';
import Reservas from './views/Reservas';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Início",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Perfil",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/novo-quarto",
    name: "Novo quarto",
    icon: "nc-icon nc-notes",
    component: FormQuarto,
    layout: "/admin",
  },
  {
    path: "/nova-reserva",
    name: "Minhas reservas",
    icon: "nc-icon nc-lock-circle-open",
    component: Reservas,
    layout: "/admin",
  },
];

export default dashboardRoutes;
