import SocialMediaLinks from "@/components/SocialMediaLinks";
import DownButton from "@/assets/DownButton.svg";
import CustomCursor from "@/components/CustomCursor";
import BlurryMovingBlobs from "@/components/BlurryMovingBlobs";

export default function Home() {
  return (
    <div className="h-screen w-full max-h-screen grid-overlap-container">
      <CustomCursor doesPageScroll={false} />
      <div className="custom-cursor-reveal-layer h-full max-h-screen w-full grid-overlap-container grid-overlap-element z-50">
        <BlurryMovingBlobs className="bg-darkest-purple grid-overlap-element max-h-screen" />
        <div className="h-screen w-full px-[9%] py-[7.5%] grid-overlap-element landing-page-content-grid z-51">
          hi from masked overlapper
        </div>
      </div>
      <div className="select-none main-content-layer h-full max-h-screen w-full z-10 px-[9%] py-[3%] grid-overlap-element landing-page-content-grid bg-black text-white">
        <p className="area-social-media">hi from non-overlapper!</p>

        <p className="area-navbar">hi from navbar</p>

        <div className="area-content-1 flex flex-row items-center px-[10%] justify-between">
          <img src="/images/LandingPic1.png" className="max-h-[35vh] rounded-2xl" />
          <div className="w-full flex justify-center">
            <p className="">Hi, I'm Rithik</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between area-content-2">
          <SocialMediaLinks />
          <div className="min-h-4" />
          <DownButton className="h-16 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
