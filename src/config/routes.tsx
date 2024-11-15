type Routes = {
  [key: string]: string;
};

const routes: Routes = {
  home: "/",
  iphone: "/iphone",
  mac: "/mac",
  cart: "/cart",
  ipad: "/ipad",
  login: "/login",
  watch: "/watch",
  productDetail: "/:idproduct",
  addproduct: "/add_product",
};

export default routes;
