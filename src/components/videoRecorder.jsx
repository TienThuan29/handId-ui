/* import { useState, useRef, useCallback } from 'react';

const VideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      };

      mediaRecorder.start();
      setRecording(true);

      // Stop recording after 5 seconds
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
        setRecording(false);
      }, 5000);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }, []);

  const downloadVideo = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'recorded-video.mp4';
      a.click();
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '500px' }} />
      <div>
        <button onClick={startRecording} disabled={recording}>
          {recording ? 'Recording...' : 'Start Recording'}
        </button>
        {videoUrl && (
          <button onClick={downloadVideo}>Download Video</button>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;

*/

// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as handpose from '@tensorflow-models/handpose';

// const VideoRecorder = () => {
//   const [recording, setRecording] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(null);
//   const [handDetected, setHandDetected] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const videoRef = useRef(null);
//   const handposeModelRef = useRef(null);

//   useEffect(() => {
//     const loadHandposeModel = async () => {
//       const model = await handpose.load();
//       handposeModelRef.current = model;
//     };
//     loadHandposeModel();
//   }, []);

//   const detectHand = useCallback(async () => {
//     if (videoRef.current && handposeModelRef.current) {
//       const predictions = await handposeModelRef.current.estimateHands(videoRef.current);
//       setHandDetected(predictions.length > 0);
      
//       if (!predictions.length && recording) {
//         // Hand removed, stop recording
//         mediaRecorderRef.current.stop();
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//         setRecording(false);
//       }
//     }
//   }, [recording]);

//   useEffect(() => {
//     let detectionInterval;
//     if (recording) {
//       detectionInterval = setInterval(detectHand, 100); // Check every 100ms
//     }
//     return () => {
//       if (detectionInterval) clearInterval(detectionInterval);
//     };
//   }, [recording, detectHand]);

//   const startRecording = useCallback(async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       videoRef.current.srcObject = stream;
      
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
      
//       const chunks = [];
//       mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: 'video/mp4' });
//         const url = URL.createObjectURL(blob);
//         setVideoUrl(url);
//       };

//       mediaRecorder.start();
//       setRecording(true);

//       // Remove the setTimeout block
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//     }
//   }, []);

//   const downloadVideo = () => {
//     if (videoUrl) {
//       const a = document.createElement('a');
//       a.href = videoUrl;
//       a.download = 'recorded-video.mp4';
//       a.click();
//     }
//   };

//   return (
//     <div>
//       <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '500px' }} />
//       <div>
//         <button onClick={startRecording} disabled={recording}>
//           {recording ? 'Recording...' : 'Start Recording'}
//         </button>
//         {videoUrl && (
//           <button onClick={downloadVideo}>Download Video</button>
//         )}
//       </div>
//       <p>
//         {recording
//           ? handDetected
//             ? "Hand detected. Recording in progress..."
//             : "No hand detected. Recording will stop when a hand is detected and then removed."
//           : "Press 'Start Recording' and show your hand to begin."}
//       </p>
//     </div>
//   );
// };

// export default VideoRecorder;

// import { useState, useRef, useCallback, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as handpose from '@tensorflow-models/handpose';

// const VideoRecorder = () => {
//   const [recording, setRecording] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(null);
//   const [handDetected, setHandDetected] = useState(false);
//   const [handDetectionTime, setHandDetectionTime] = useState(0);
//   const mediaRecorderRef = useRef(null);
//   const videoRef = useRef(null);
//   const handposeModelRef = useRef(null);

//   useEffect(() => {
//     const loadHandposeModel = async () => {
//       const model = await handpose.load();
//       handposeModelRef.current = model;
//     };
//     loadHandposeModel();
//   }, []);

//   const detectHand = useCallback(async () => {
//     if (videoRef.current && handposeModelRef.current) {
//       const predictions = await handposeModelRef.current.estimateHands(videoRef.current);
//       const isHandDetected = predictions.length > 0;
//       setHandDetected(isHandDetected);
      
//       if (isHandDetected) {
//         setHandDetectionTime(prevTime => prevTime + 100); // Increment by 100ms
//       } else {
//         setHandDetectionTime(0); // Reset if hand is not detected
//       }

//       if (handDetectionTime >= 3000) { // 3 seconds
//         // Stop recording
//         mediaRecorderRef.current.stop();
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//         setRecording(false);
        
//       }
//     }
//   }, [handDetectionTime]);

//   useEffect(() => {
//     let detectionInterval;
//     if (recording) {
//       detectionInterval = setInterval(detectHand, 100); // Check every 100ms
//     }
//     return () => {
//       if (detectionInterval) clearInterval(detectionInterval);
//     };
//   }, [recording, detectHand]);

//   const startRecording = useCallback(async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       videoRef.current.srcObject = stream;
      
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
      
//       const chunks = [];
//       mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: 'video/mp4' });
//         const url = URL.createObjectURL(blob);
//         setVideoUrl(url);

//         // Automatically download the video
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'recorded-video.mp4'; // Suggested filename and path
//         a.style.display = 'none';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       };

//       mediaRecorder.start();
//       setRecording(true);
//       setHandDetectionTime(0); // Reset hand detection time
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//     }
//   }, []);

//   const downloadVideo = () => {
//     if (videoUrl) {
//       const a = document.createElement('a');
//       a.href = videoUrl;
//       a.download = 'recorded-video.mp4';
//       a.click();
//     }
//   };

//   return (
//     <div>
//       <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '500px' }} />
//       <div>
//         <button onClick={startRecording} disabled={recording}>
//           {recording ? 'Recording...' : 'Start Recording'}
//         </button>
//         {videoUrl && (
//           <button onClick={downloadVideo}>Download Video</button>
//         )}
//       </div>
//       <p>
//         {recording
//           ? handDetected
//             ? `Hand detected for ${(handDetectionTime / 1000).toFixed(1)} seconds...`
//             : "Waiting for hand detection..."
//           : videoUrl
//             ? "Recording complete. You can now download the video."
//             : "Press 'Start Recording' to begin."}
//       </p>
//     </div>
//   );
// };

// export default VideoRecorder;