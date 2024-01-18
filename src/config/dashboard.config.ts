import { Pages } from "@/constants/page.constant";

type routeType = {
  label: string;
  path: string;
  subroutes?: routeType[];
};

export const DasboardRoutes: routeType[] = [
  { label: "Products", path: Pages.ManageProducts },
  { label: "Orders", path: Pages.ManageOrders },
  { label: "Users", path: Pages.ManageUsers },
];
