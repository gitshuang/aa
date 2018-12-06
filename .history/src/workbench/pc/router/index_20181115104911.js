import Home from 'pages/home';
import asyncComponent from './lazyload';
const Page404 = asyncComponent(() => import(/* webpackChunkName: "Page404" */'pages/404'));
// 工作页
const Work = asyncComponent(() => import(/* webpackChunkName: "Work" */'pages/work'));
// 全部应用
const Application = asyncComponent(() => import(/* webpackChunkName: "Application" */'pages/application'));
// 首页编辑
const Manage = asyncComponent(() => import(/* webpackChunkName: "Manage" */'pages/manage'));
// 搜索
const Search = asyncComponent(() => import(/* webpackChunkName: "Search" */'pages/search'));
// 原来设计的 现在其实是搜索的组件
const SearchResult = asyncComponent(() => import(/* webpackChunkName: "SearchResult" */'containers/searchResult'));
// 创建团队/企业(当前无任何租户情况)
const Establish = asyncComponent(() => import(/* webpackChunkName: "Establish" */'pages/establish'));
// 创建团队/企业（有租户，创建新租户）
const EstablishUserCenter = asyncComponent(() => import(/* webpackChunkName: "EstablishUserCenter" */'pages/establishusercenter'));
// 创建团队
const CreateTeam = asyncComponent(() => import(/* webpackChunkName: "CreateTeam" */'pages/createteam'));
// 创建企业
const CreateEnter = asyncComponent(() => import(/* webpackChunkName: "CreateEnter" */'pages/createenter'));
// 团队设置
const Teamconfig = asyncComponent(() => import(/* webpackChunkName: "Teamconfig" */'pages/teamconfig'));
// 团队升级为企业
const UpdateEnter = asyncComponent(() => import(/* webpackChunkName: "UpdateEnter" */'pages/updateenter'));
// 邀请成员
const Invitation = asyncComponent(() => import(/* webpackChunkName: "Invitation" */'pages/invitation'));
// 账号管理
const Account = asyncComponent(() => import(/* webpackChunkName: "Account" */'pages/account'));
// 应用市场
const Market = asyncComponent(() => import(/* webpackChunkName: "Market" */'pages/market'));
// 续费
const Renew = asyncComponent(() => import(/* webpackChunkName: "Renew" */'pages/renew'));
// 员工信息
const UserInfo = asyncComponent(() => import(/* webpackChunkName: "UserInfo" */'pages/userinfo'));
// 管理团队/企业
const ManageTeamEnter = asyncComponent(() => import(/* webpackChunkName: "ManageTeamEnter" */'pages/manageTeamEnter'));
// 个人主页
const HomePage = asyncComponent(() => import(/* webpackChunkName: "Dynamic" */'pages/homepage'));

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/:type(app|service)/:code/:subcode?',
    component: Work,
  },
  {
    path: '/application',
    component: Application,
  },
  {
    path: '/manage',
    component: Manage,
  },
  {
    path: '/search',
    component: Search,
    routes: [
      {
        path: '/search/:id/:value',
        component: SearchResult,
        exact: true,
      },
    ],
  },
  {
    path: '/establish',
    component: Establish,
  },
  {
    path: '/establishusercenter',
    component: EstablishUserCenter,
  },
  {
    path: '/createteam/:data',
    component: CreateTeam,
  },
  {
    path: '/createenter/:data',
    component: CreateEnter,
  },
  {
    path: '/teamconfig',
    component: Teamconfig,
  },
  {
    path: '/updateenter',
    component: UpdateEnter,
  },
  {
    path: '/invitation',
    component: Invitation,
  },
  {
    path: '/account',
    component: Account,
  },
  {
    path: '/market',
    component: Market,
  },
  {
    path: '/market/application/:id',
    component: Market,
  },
  {
    path: '/renew/:id',
    component: Renew,
  },
  {
    path: '/userinfo',
    component: UserInfo,
  },
  {
    path: '/manageTeamEnter',
    component: ManageTeamEnter,
  },
  {
    path: '/homepage/:userId/:key',
    component: HomePage,
  },
];

export default routes;
