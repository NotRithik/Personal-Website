'use client';

import React, { useRef, useEffect } from 'react';

interface BlurryMovingBlobsProps {
  className?: string;
}

const Blob1Url = "/blobs/Blob1.svg";
const Blob2Url = "/blobs/Blob2.svg";
const Blob3Url = "/blobs/Blob3.svg";
const Blob4Url = "/blobs/Blob4.svg";
const Blob5Url = "/blobs/Blob5.svg";
const Blob6Url = "/blobs/Blob6.svg";
const Blob7Url = "/blobs/Blob7.svg";

interface BlobData {
  initialX: number;
  initialY: number;
  offsetX: number;
  offsetY: number;
  duration: number; // in milliseconds
  delay: number; // in milliseconds
  image: HTMLImageElement;
  width: number;
  height: number;
}

const BlurryMovingBlobs: React.FC<BlurryMovingBlobsProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution based on its rendered size.
    const setCanvasSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    setCanvasSize();

    // Adjust canvas size on window resize.
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener("resize", handleResize);

    // Array of blob URLs.
    const blobUrls = [
      Blob1Url,
      Blob2Url,
      Blob3Url,
      Blob4Url,
      Blob5Url,
      Blob6Url,
      Blob7Url,
    ];

    // Helper function to load an image.
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    // Preload all blob images.
    Promise.all(blobUrls.map(loadImage))
      .then((images) => {
        const containerWidth = canvas.width;
        const containerHeight = canvas.height;
        const minBlobDistance = 180; // Minimum distance between blobs.
        const viewportPadding = 100; // Padding from container edges.

        const randomInRange = (min: number, max: number) =>
          Math.random() * (max - min) + min;
        const getDistance = (
          x1: number,
          y1: number,
          x2: number,
          y2: number
        ) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        const blobDataArray: BlobData[] = [];
        const placedPositions: { x: number; y: number }[] = [];

        // Generate non-overlapping positions and random movement parameters for each blob.
        images.forEach((img, index) => {
          let valid = false;
          let x = 0,
            y = 0;
          while (!valid) {
            x = randomInRange(viewportPadding, containerWidth - viewportPadding);
            y = randomInRange(viewportPadding, containerHeight - viewportPadding);
            valid = placedPositions.every(
              (pos) => getDistance(x, y, pos.x, pos.y) >= minBlobDistance
            );
          }
          placedPositions.push({ x, y });
          const offsetX = randomInRange(-400, 400);
          const offsetY = randomInRange(-200, 200);
          const duration = randomInRange(2, 3) * 1000; // Convert seconds to ms.
          const delay = index * 300; // Stagger start times by 0.3 sec.
          blobDataArray.push({
            initialX: x,
            initialY: y,
            offsetX,
            offsetY,
            duration,
            delay,
            image: img,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        });

        const startTime = performance.now();
        const targetFPS = 24; // Adjust this value to control fps.
        const frameInterval = 1000 / targetFPS;
        let lastFrameTime = performance.now();

        // Animation loop with FPS throttling.
        const animate = () => {
          const now = performance.now();
          if (now - lastFrameTime < frameInterval) {
            requestAnimationFrame(animate);
            return;
          }
          lastFrameTime = now;
          const elapsed = now - startTime;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Apply a strong blur filter to mimic your CSS blur.
          ctx.filter = "blur(64px)";

          blobDataArray.forEach((blob) => {
            let t = elapsed - blob.delay;
            if (t < 0) t = 0;
            const cycle = blob.duration * 2;
            let progress = (t % cycle) / blob.duration;
            if (progress > 1) {
              progress = 2 - progress; // Yoyo effect.
            }
            const currentX = blob.initialX + blob.offsetX * progress;
            const currentY = blob.initialY + blob.offsetY * progress;
            // Draw the blob image centered at (currentX, currentY).
            ctx.drawImage(
              blob.image,
              currentX - blob.width / 2,
              currentY - blob.height / 2,
              blob.width,
              blob.height
            );
          });

          requestAnimationFrame(animate);
        };
        animate();
      })
      .catch((err) => {
        console.error("Error loading blob images:", err);
      });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`blurry-blobs-container ${className ? className : ""}`}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Ensure it doesn't interfere with interactions.
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};

export default BlurryMovingBlobs;
