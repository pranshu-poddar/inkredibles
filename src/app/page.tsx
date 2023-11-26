import { Blogs } from "@/__mocks__/blog.mocks";
import { WomenCollection, MenCollections } from "@/__mocks__/product.mock";
import BlogSection from "@/components/home/blog-section";
import InstagramSection from "@/components/home/instagram-section";
import MainCarousel from "@/components/home/main-carousel";
import Newsletter from "@/components/home/newsletter";
import ProductSection from "@/components/home/product-section";
import SpecialSection from "@/components/home/special-section";
import { HomeAssets } from "@/constants/assets.constant";

export default function Home() {
  return (
    <main >
      <Newsletter />
      <MainCarousel />
      <ProductSection title="For Women's Collection" banner={HomeAssets.WomenBanner} Products={WomenCollection} />
      <SpecialSection />
      <ProductSection title="For Men's Collection" banner={HomeAssets.MenBanber} Products={MenCollections} isReversed={true} />
      <BlogSection blogs={Blogs} />
      <InstagramSection/>
    </main>
  )
}
