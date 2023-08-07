

// import React, { useState, useEffect, useRef } from 'react';

// function VideoPlayer({ videoList }) {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     // When the component mounts or the current video index changes,
//     // set the source of the video player to the corresponding video
//     console.log(videoList);
//     videoRef.current.src = videoList[currentVideoIndex];
//     if (currentVideoIndex != 0 && ((currentVideoIndex + 1) % videoList.length) == 0)
//       {
//         videoRef.current.pause();
//       }
//       else
//       {
//         videoRef.current.play();
//       }
//     // When the current video ends, play the next video in the list
//     videoRef.current.addEventListener('ended', () => {
//       let flag = false;
//       if (currentVideoIndex != 0 && ((currentVideoIndex + 1) % videoList.length) == 0)
//       {
//         flag = true;
//       }
//       setCurrentVideoIndex((currentVideoIndex + 1) % videoList.length);

//     });

//     // Clean up the event listener when the component unmounts
//     return () => {
//       videoRef.current.removeEventListener('ended', () => {});
//     };

//   }, [currentVideoIndex, videoList]);

//   return (
//     <div>
//       <video ref={videoRef} controls style={{ width: '1000px', height: '600px' }} />
//     </div>
//   );
// }

// export default VideoPlayer;


// import React, { useState, useEffect, useRef } from 'react';
// import '../css/additional-styles/VideoPlayer.css';
// import { isCompositeComponent } from 'react-dom/test-utils';

// function VideoPlayer({ videoList }) {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const videoRef = useRef(null);
//   const [videoDurations, setVideoDurations] = useState([]);
//   const [thumbnails, setThumbnails] = useState([]);
//   const [temp, setTemp] = useState(0);

//   useEffect(() => {
//     videoRef.current.src = videoList[currentVideoIndex];
//     videoRef.current.play();
//     videoRef.current.addEventListener('ended', handleVideoEnd);

//     return () => {
//       videoRef.current.removeEventListener('ended', handleVideoEnd);
//     };
//   }, [currentVideoIndex, videoList]);

//   useEffect(() => {
//     videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

//     return () => {
//       videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
//     };
//   }, []);

//   useEffect(() => {
//     generateThumbnails();
//   }, [videoList]);

//   const generateThumbnails = async () => {
//     try {
//       const thumbnailPromises = videoList.map(generateVideoThumbnail);
//       const thumbnails = await Promise.all(thumbnailPromises);
//       setThumbnails(thumbnails);
//     } catch (error) {
//       console.error('Error generating thumbnails:', error);
//     }
//   };

//   const generateVideoThumbnail = (videoUrl) => {
//     return new Promise((resolve, reject) => {
//       const videoElement = document.createElement('video');
//       videoElement.crossOrigin = 'anonymous';
//       videoElement.src = videoUrl;

//       videoElement.addEventListener('loadedmetadata', () => {
//         const duration = videoElement.duration;
//         const captureTime = duration > 10 ? 10 : duration / 2;
//         videoElement.currentTime = captureTime;

//         videoElement.addEventListener('seeked', () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = videoElement.videoWidth;
//           canvas.height = videoElement.videoHeight;
//           const context = canvas.getContext('2d');
//           context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//           const thumbnailDataUrl = canvas.toDataURL();
//           resolve(thumbnailDataUrl);
//         });

//         videoElement.addEventListener('error', reject);
//       });
//     });
//   };

//   const handleVideoEnd = () => {
//     setCurrentVideoIndex((currentVideoIndex + 1) % videoList.length);
//   };

//   const handleThumbnailClick = (index) => {
//     setCurrentVideoIndex(index);
//   };


//   const getVideoDuration = (videoSrc) => {
//     return new Promise((resolve, reject) => {
//       const videoElement = document.createElement('video');
//       videoElement.src = videoSrc;
  
//       videoElement.addEventListener('loadedmetadata', () => {
//         const duration = videoElement.duration;
//         resolve(duration);
//       });
  
//       videoElement.addEventListener('error', reject);
//     });
//   };
  
//   const handleLoadedMetadata = () => {
//     const durations = videoList.map((video) => getVideoDuration(video));

//     // const realdurations = durations.map((duration) => {return duration.then(result => {return result})});
//     async function getRealDurations() {
//       const realdurations = await Promise.all(durations.map(duration => duration));
//       console.log("hi",realdurations);
//       setVideoDurations(realdurations);
//     }
    
//     getRealDurations();
    
//   };

//   const formatDuration = (duration) => {
//     const minutes = Math.floor(duration / 60);
//     const seconds = Math.floor(duration % 60);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   return (
//     <div className="VideoPlayer" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//       <video
//         ref={videoRef}
//         controls
//         style={{
//           width: '800px',
//           height: '400px',
//           marginTop: '20px',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//         }}
//       />
//       <div className="ThumbnailsContainer ">
//         {/* <h2 className='bg-gray-900'
//           style={{
//             position: 'sticky',
//             top: '0',
//             padding: '10px',
//             marginBottom: '10px',
//           }}
//         >
//           Chapters
//         </h2> */}
//         <h4 className="h4 mb-2">Chapters</h4>

//         <div
//           style={{
//             overflowX: 'auto',
//             // display: 'flex',
//             flexWrap: 'nowrap',
//             paddingBottom: '10px',
//           }}
//         >
//           {videoList.map((video, index) => (
//             <div className={currentVideoIndex === index ? 'bg-gray-900' : ''}
//               key={index}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 marginRight: '5px',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//               onClick={() => handleThumbnailClick(index)}  
//             >
//               <img
//                 src={thumbnails[index]}
//                 alt={`Thumbnail ${index}`}
//                 style={{
//                   width: '130px',
//                   height: '80px',
//                   marginRight: '10px',
//                   cursor: 'pointer',
//                   border: currentVideoIndex === index ? '1px solid #333' : '1px solid #ccc',
//                   borderRadius: '4px',
//                   transition: 'border-color 0.3s',
//                   marginTop: '10px',
//                   marginBottom: '10px',
//                 }}
//                // onClick={() => handleThumbnailClick(index)}
//               />
//               <div
//                 href="#"
//                // onClick={() => handleThumbnailClick(index)}
//                 //className={currentVideoIndex === index ? 'highlighted' : ''}
//                 style={{
//                   color: '#ffffff',
//                   textDecoration: 'none',
//                   fontSize: '14px',
//                   fontWeight: 'bold',
                  
//                 }}
//               >
//                 {formatDuration(videoDurations[index] || 0)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoPlayer;

import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import '../css/additional-styles/VideoPlayer.css';
import { isCompositeComponent } from 'react-dom/test-utils';

function VideoPlayer({ videoList }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const [videoDurations, setVideoDurations] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    videoRef.current.src = videoList[currentVideoIndex];
    videoRef.current.play();
    videoRef.current.addEventListener('ended', handleVideoEnd);

    return () => {
      videoRef.current.removeEventListener('ended', handleVideoEnd);
    };
  }, [currentVideoIndex, videoList]);

  useEffect(() => {
    videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    generateThumbnails();
  }, [videoList]);

  const generateThumbnails = async () => {
    try {
      const thumbnailPromises = videoList.map(generateVideoThumbnail);
      const thumbnails = await Promise.all(thumbnailPromises);
      setThumbnails(thumbnails);
    } catch (error) {
      console.error('Error generating thumbnails:', error);
    }
  };

  const generateVideoThumbnail = (videoUrl) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video');
      videoElement.crossOrigin = 'anonymous';
      videoElement.src = videoUrl;

      videoElement.addEventListener('loadedmetadata', () => {
        const duration = videoElement.duration;
        const captureTime =  0;
        videoElement.currentTime = captureTime;

        videoElement.addEventListener('seeked', () => {
          const canvas = document.createElement('canvas');
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          const context = canvas.getContext('2d');
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const thumbnailDataUrl = canvas.toDataURL();
          resolve(thumbnailDataUrl);
        });

        videoElement.addEventListener('error', reject);
      });
    });
  };

  const handleVideoEnd = () => {
    setCurrentVideoIndex((currentVideoIndex + 1) % videoList.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentVideoIndex(index);
  };

  const getVideoDuration = (videoSrc) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video');
      videoElement.src = videoSrc;

      videoElement.addEventListener('loadedmetadata', () => {
        const duration = videoElement.duration;
        resolve(duration);
      });

      videoElement.addEventListener('error', reject);
    });
  };

  const handleLoadedMetadata = () => {
    const durations = videoList.map((video) => getVideoDuration(video));

    async function getRealDurations() {
      const realdurations = await Promise.all(durations.map((duration) => duration));
      setVideoDurations(realdurations);
    }

    getRealDurations();
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="VideoPlayer container">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <video
            ref={videoRef}
            controls
            style={{
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <div className="ThumbnailsContainer">
            <h4 className="h4 mb-2">Chapters</h4>
            <div
              style={{
                overflowX: 'auto',
                flexWrap: 'nowrap',
                paddingBottom: '10px',
              }}
            >
              {videoList.map((video, index) => (
                <div
                  className={currentVideoIndex === index ? 'bg-gray-900' : ''}
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '5px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={thumbnails[index]}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: '130px',
                      height: '80px',
                      marginRight: '10px',
                      cursor: 'pointer',
                      border: currentVideoIndex === index ? '1px solid #333' : '1px solid #ccc',
                      borderRadius: '4px',
                      transition: 'border-color 0.3s',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  />
                  <div
                    href="#"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {formatDuration(videoDurations[index])}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default VideoPlayer;



