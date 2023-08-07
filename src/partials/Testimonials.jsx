import React, { useState, useRef, useEffect } from "react";
import Modal from '../utils/Modal';
import HeroImage from '../images/hero-image-01.jpg';
import VideoPlayer from "../components/VideoPlayer";
import './Testimonals.css'

function Testimonials(props) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const video = useRef(null);

  let video1 = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  let video2 = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
  let video3 = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  // const videoList = [
  //   video1,
  //   video2,
  //   video3
  // ];

  // useEffect(() => {
  //   videoModalOpen ? video.current.play() : video.current.pause();
  // }, [videoModalOpen]); 
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* <div className="video-header"> */}
            {/* <div
              className="relative flex justify-center items-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                className="mx-auto"
                src={HeroImage}
                width="1024"
                height="504"
                alt="Hero"
              />
              <a
                className="absolute group"
                href="#0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setVideoModalOpen(true);
                }}
                aria-controls="modal"
              >
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20 hover:opacity-75 transition duration-150 ease-in-out"
                  viewBox="0 0 88 88"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="78.169%"
                      y1="9.507%"
                      x2="24.434%"
                      y2="90.469%"
                      id="a"
                    >
                      <stop stopColor="#EBF1F5" stopOpacity=".8" offset="0%" />
                      <stop stopColor="#EBF1F5" offset="100%" />
                    </linearGradient>
                  </defs>
                  <circle fill="url(#a)" cx="44" cy="44" r="44" />
                  <path
                    className="fill-current text-purple-600"
                    d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
                  />
                </svg>
              </a>
            </div> */}
            {/* <VideoPlayer videoList={props.videoList}/> */}
            <VideoPlayer videoList={props.videoList}/>

            {/* <Modal
              id="modal"
              ariaLabel="modal-headline"
              show={videoModalOpen}
              handleClose={() => setVideoModalOpen(false)}
            >
              <div className="relative pb-9/16">
                <video
                  ref={video}
                  className="absolute w-full h-full"
                  width="1920"
                  height="1080"
                  loop
                  autoPlay
                  controls
                >
                  <source src="/videos/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Modal> */}
          {/* </div> */}
      </div>
    </section>



  );
}

export default Testimonials;
