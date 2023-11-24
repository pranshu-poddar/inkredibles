import { WomenCollection,MenCollections } from "@/__mocks__/product.mock";
import MainCarousel from "@/components/home/main-carousel";
import ProductSection from "@/components/home/product-section";
import SpecialSection from "@/components/home/special-section";
import { HomeAssets } from "@/constants/assets.constant";

export default function Home() {
  return (
    <main >
    <MainCarousel/>
    <ProductSection title="For Women's Collection" banner={HomeAssets.WomenBanner} Products={WomenCollection}/>
    <SpecialSection/>
    <ProductSection title="For Men's Collection" banner={HomeAssets.MenBanber} Products={MenCollections} isReversed={true}/>
    </main>
  )
}
