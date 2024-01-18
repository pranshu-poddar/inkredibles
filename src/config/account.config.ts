import { AccountAssets } from "@/constants/assets.constant";
import { Pages } from "@/constants/page.constant";

type routeType = {
  label: string;
  path: string;
  roles: string[];
  subroutes?: routeType[];
  icon: string;
};

export const AccountRoutes: routeType[] = [
  { label: "Account", path: Pages.Overview, roles: ["user", "admin"], icon: AccountAssets.Account },
  { label: "Orders", path: Pages.Orders, roles: ["user", "admin"], icon: AccountAssets.Product },
  { label: "Dashboard", path: Pages.Dasboard, roles: ["admin"], icon: AccountAssets.Dashboard},
];
