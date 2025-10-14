import AllPageTopBannar from "@/components/ui/AllPageTopBanner";
import React from "react";
import ChampionsLeagueGarrery from "@/components/gallery/GalleryTabs";

const GalleryPage = () => {
  
  return (
    <div>
      <AllPageTopBannar pageName="gallery" pageTtile="ours gallery" />
      <ChampionsLeagueGarrery/>
    </div>
  );
};

export default GalleryPage;
