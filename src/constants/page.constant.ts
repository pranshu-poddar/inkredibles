const PublicPages = {
  Home: "/",
  Shop: "/shop",
  Blog: "/blogs",
  AboutUs: "/about-us",
  ContactUs: "/contact-us",
  Checkout: "/checkout/cart",
  Login:"/login",
  Signup:"/signup",
  Account:"/user/profile",
  Orders:"/user/orders",
  Addresses:"/user/addresses",
  Credit:"/user/credit",
  Overview:"/user",
  Wishlist:"/user/wishlist",
  EditProfile:"/user/profile/edit",
};

const ProtectedPages = {
  Dasboard: "/dashboard",
  ManageProducts: "/dashboard/products",
  ManageOrders: "/dashboard/orders",
  ManageUsers: "/dashboard/users",
  
};

export const PublicPagesParams: string[] = Object.values(PublicPages);
export const ProtectedPagesParams: string[] = Object.values(ProtectedPages);

export const Pages = Object.freeze({ ...PublicPages, ...ProtectedPages });
