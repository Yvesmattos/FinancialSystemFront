import Dashboard from "views/Dashboard.js";
import MinhaConta from "views/MinhaConta.js";
import Despesas from "views/Despesas.js";
import Receitas from "views/Receitas.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/minhaconta",
    name: "Minha Conta",
    icon: "nc-icon nc-circle-09",
    component: MinhaConta,
    layout: "/admin",
  },
  {
    path: "/despesas",
    name: "Despesas",
    icon: "nc-icon nc-money-coins",
    component: Despesas,
    layout: "/admin",
  },
  {
    path: "/receitas",
    name: "Receitas",
    icon: "nc-icon nc-money-coins",
    component: Receitas,
    layout: "/admin",
  }
];

export default dashboardRoutes;
