import { AccountAssets } from "@/constants/assets.constant";
import { Pages } from "@/constants/page.constant";

type routeType = {
  label: string;
  path: string;
  subroutes?: routeType[];
};

export const UserSideBar: routeType[] = [
  { label: "Overview", path: Pages.Overview },
  { label: "Orders & Returns", path: Pages.Orders },
  { label: "Wishlist", path: Pages.Wishlist },
  { label: "Credit Points", path: Pages.Credit },
  { label: "Profile", path: Pages.Account },
  { label: "Addresses", path: Pages.Addresses },
];

export const OverviewTabs = [
  {
    label: "Orders",
    path: Pages.Orders,
    des: "Check your order status",
    icon: AccountAssets.Product,
  },
  {
    label: "Collections & Wishlist",
    path: Pages.Wishlist,
    des: "All your curated product collections",
    icon: AccountAssets.Favorites,
  },
  {
    label: "Credit Points",
    path: Pages.Credit,
    des: "Manage all your refunds & gift cards",
    icon: AccountAssets.Credit,
  },
  {
    label: "Profile Details",
    path: Pages.Account,
    des: "Change your profile details",
    icon: AccountAssets.EditAccount,
  },
  {
    label: "Addresses",
    path: Pages.Addresses,
    des: "Save addresses for a hassle-free checkout",
    icon: AccountAssets.Address,
  },
];
