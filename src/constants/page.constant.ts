const PublicPages = {
    Home:"/",
    Shop:"/shop",
    Blog:"/blog",
    AboutUs:"/about-us",
    ContactUs:"/contact-us",
}

const ProtectedPages = {

}

export const PublicPagesParams:string[] = Object.values(PublicPages);
export const ProtectedPagesParams:string[] = Object.values(ProtectedPages);

export const Pages = Object.freeze({...PublicPages,...ProtectedPages})