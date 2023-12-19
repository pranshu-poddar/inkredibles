const PublicPages = {
  Home: "/",
  Shop: "/shop",
  Blog: "/blogs",
  AboutUs: "/about-us",
  ContactUs: "/contact-us",
  Checkout: "/checkout",
};

const ProtectedPages = {};

export const PublicPagesParams: string[] = Object.values(PublicPages);
export const ProtectedPagesParams: string[] = Object.values(ProtectedPages);

export const Pages = Object.freeze({ ...PublicPages, ...ProtectedPages });
