import { SobhaHomepage } from "@/components/SobhaHomepage";
import { getCmsFloorPlans, getCmsPortfolioImages } from "@/sanity/lib/content";
import { getHomepageMedia } from "@/sanity/lib/media";

export const revalidate = 60;

export default async function Home() {
  const [homepageMedia, floorPlans, recentBuildImages] = await Promise.all([
    getHomepageMedia(),
    getCmsFloorPlans(),
    getCmsPortfolioImages(),
  ]);

  return (
    <SobhaHomepage
      floorPlans={floorPlans}
      homepageMedia={homepageMedia}
      recentBuildImages={recentBuildImages}
    />
  );
}
