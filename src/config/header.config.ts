import { Pages } from "@/constants/page.constant";

 type routeType ={
    label:string,
    path:string,
    subroutes?:routeType[]
}

export const NavRoutes:routeType[] = [
    {label:"Home",path:Pages.Home},
    {label:"Shop",path:Pages.Shop},
    {label:"Blog",path:Pages.Blog},
    {label:"About Us",path:Pages.AboutUs},
    {label:"Contact Us",path:Pages.ContactUs},
]