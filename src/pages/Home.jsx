import React, { useState } from 'react';
import axios from "axios"
import PageIllustration from '../partials/PageIllustration';
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import Testimonials from '../partials/Testimonials';
// import video1 from '../videos/1.mp4';
// import video2 from '../videos/2.mp4';
// import video3 from '../videos/3.mp4';
// import video4 from '../videos/4.mp4';
// import video5 from '../videos/5.mp4';
// import video6 from '../videos/6.mp4';
function Home() {
  let video1 = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
  let video2 = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';
  let video3 = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
  //const [videoList, setVideoList] = useState([video1, video2, video3, video4, video5, video6])
  const[videoList, setVideoList] = useState([])
  //const [videoList, setVideoList] = useState([])


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <HeroHome />
        <FeaturesBlocks setVideoList={setVideoList}
        />
        <Testimonials videoList={videoList} />
        <div style={{height:"40px"}}></div>
      </main>
    </div>
  );
}
export default Home;