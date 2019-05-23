import Cart from './pages/cart';
import Home from './pages/home';
import Enter from './pages/user/entering';
import Pending from './pages/user/pending';
import Pay from './pages/user/pay';
import Applcation from './pages/user/application';
import addressList from './pages/address/addressList';
import addAddress from './pages/address/addAddress';
import Detail  from './pages/shop/detail';
import SubmitOrder from './pages/order/submit';
import PayOrder from './pages/order/pay';
import Works from './pages/user/works';
import OrderList from './pages/order/orderList';
import OrderDetails from './pages/order/orderDetails';
import Oauth from './pages/user-login/oauth';
import WorkList from  './pages/user/worklist';
import Bind from './pages/user-login/bind';

export default [
    {
        path: "/",
        component: Home,
        exact: true,
        key: 'home'
    },
    {
        path: "/cart",
        component: Cart,
        exact: true,
        key: 'cart'
    },
    {
        path: "/enter",
        component: Enter,
        exact: true,
        key: 'enter'
    },
    {
        path: "/application",
        component: Applcation,
        exact: true,
        key: 'application'
    }
    ,
    {
        path: "/pend",
        component: Pending,
        exact: true,
        key: 'pend'
    }
    ,
    {
        path: "/pay",
        component: Pay,
        exact: true,
        key: 'pay'
    },
    {
        path: "/addressList",
        component: addressList,
        exact: true,
        key: 'addressList'
    },
    {
        path: "/addAddress",
        component: addAddress,
        exact: true,
        key: 'addAddress'
    },
    {
        path: "/detail",
        component: Detail,
        exact: true,
        key: 'detail'
    },
    {
        path:"/submitorder",
        component:SubmitOrder,
        key:'submitorder'
    },
    {
        path:"/payorder",
        component:PayOrder,
        exact: true,
        key:'payorder'
    },
    {
        path:"/work",
        component:Works,
        key:'work'
    },
    {
        path:"/orderList",
        component:OrderList,
        exact: true,
        key:'orderList'
    },
    {
        path:"/orderDetails",
        component:OrderDetails,
        exact: true,
        key:'orderDetails'
    },
    {
        path:"/oauth",
        component:Oauth,
        key:'oauth'
    }
    ,
    {
        path:"/worklist",
        component:WorkList,
        key:'worklist'
    }
    ,
    {
        path:"/bind",
        component:Bind,
        key:'bind'
    }
];