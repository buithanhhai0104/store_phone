import config from "../config";
import Home from "../pages/home/Home";
import Mac from "../pages/mac/Mac";
import Cart from "../pages/cart/Cart";
import IPhone from "../pages/iphone/IPhone";
import Login from "../pages/Login/Login";
import ProductDetail from "../pages/productDetail/ProductDetail";
import Ipad from "../pages/ipad/Ipad";
import Watch from "../pages/watch/Watch";
import ProductManagement from "../pages/productManagement/Productmanagement";
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.mac, component: Mac },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.iphone, component: IPhone },
  { path: config.routes.ipad, component: Ipad },
  { path: config.routes.watch, component: Watch },
  { path: config.routes.login, component: Login },
  { path: config.routes.productDetail, component: ProductDetail },
  { path: config.routes.productmanagement, component: ProductManagement },
];
export default publicRoutes;
