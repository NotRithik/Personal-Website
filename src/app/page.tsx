import SocialMediaLinks from "@/components/SocialMediaLinks";
import DownButton from "@/assets/DownButton.svg";
import CustomCursor from "@/components/CustomCursor";
import BlurryMovingBlobs from "@/components/BlurryMovingBlobs";
import AmbientLighting from "@/components/AmbientLighting";
import DelayedLink from "@/components/DelayedLink";

export default function Home() {
  const cursorAndLinkAnimationDelay = 650;

  return (
    <div className="h-screen w-full max-h-screen grid-overlap-container">
      <CustomCursor doesPageScroll={false} />

      {/* Masked layer (the one that shows when you hover the cursor over it) */}

      <div className="custom-cursor-reveal-layer h-full max-h-screen w-full grid-overlap-container grid-overlap-element z-50">
        <BlurryMovingBlobs className="bg-darkest-purple grid-overlap-element max-h-screen" />
        <div className="h-screen w-full max-h-screen max-w-screen px-[9%] py-[3%] grid-overlap-element landing-page-content-grid text-white z-51">
          <div className="area-social-media pl-[35%]"></div>

          <div className="area-navbar flex flex-row font-inter text-right pr-[35%] text-2xl justify-between">
            <DelayedLink delay={cursorAndLinkAnimationDelay} className="h-0" href="/work">Work Ex</DelayedLink>
            <DelayedLink delay={cursorAndLinkAnimationDelay} className="h-0" href="">Projects</DelayedLink>
            <DelayedLink delay={cursorAndLinkAnimationDelay} className="h-0" href="">Blog</DelayedLink>
            <DelayedLink delay={cursorAndLinkAnimationDelay} className="h-0" href="">Certificates</DelayedLink>
          </div>

          <div className="area-content-1 flex flex-row items-center px-[10%] justify-between">
            <img src="/images/LandingPic1.png" className="max-h-[35vh] rounded-2xl filter grayscale" />
            <div className="w-full flex justify-center items-center">
              <span className="text-stroke-shadow font-inter text-6xl -mr-2">Hey, I'm&nbsp;</span>
              <span className="font-jacquard-12 text-8xl text-stroke-2">
                Rithik
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between area-content-2">
            <SocialMediaLinks />
            <div className="min-h-4" />
            <DownButton className="down-button h-16 cursor-pointer fill-white" />
          </div>
        </div>
      </div>

      {/* Normal layer (The actual website itself that's normally visible) */}

      <div className="select-none main-content-layer h-full max-h-screen max-w-screen w-full z-10 px-[9%] py-[3%] grid-overlap-element landing-page-content-grid bg-black text-white">
        <div className="area-social-media pl-[35%]"></div>

        <div className="area-navbar flex flex-row font-inter text-right pr-[35%] text-2xl justify-between">
          <DelayedLink delay={cursorAndLinkAnimationDelay} className="h-0" href="/work">Work Ex</DelayedLink>
          <DelayedLink delay={cursorAndLinkAnimationDelay} className="h-0" href="">Projects</DelayedLink>
          <DelayedLink delay={cursorAndLinkAnimationDelay} className="h-0" href="">Blog</DelayedLink>
          <DelayedLink delay={cursorAndLinkAnimationDelay} className="h-0" href="">Certificates</DelayedLink>
        </div>

        <div className="area-content-1 flex flex-row items-center px-[10%] justify-between">
          <img src="/images/LandingPic1.png" className="max-h-[35vh] rounded-2xl user-drag-none" />
          <div className="w-full flex flex-row justify-center items-center">
            <span className="font-inter text-6xl -mr-2">Hey, I'm&nbsp;</span>
            <span className="font-jacquard-12 text-8xl text-radial-gradient">
              Rithik
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between area-content-2">
          <SocialMediaLinks />
          <div className="min-h-4" />
          <DownButton className="down-button h-16 cursor-pointer" />
        </div>

        <AmbientLighting className="-z-10 area-content-2 w-full h-[60%] mt-auto" />
      </div>



    </div >
  );
}
