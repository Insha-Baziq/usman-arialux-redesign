import { SobhaHomepage } from "@/components/SobhaHomepage";
import { getHomepageMedia } from "@/sanity/lib/media";

export default async function Home() {
  const homepageMedia = await getHomepageMedia();

  return <SobhaHomepage homepageMedia={homepageMedia} />;
}
