"use client";
import { useEffect, useRef } from "react";

const AdComponent = ({ adSlot }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (
          typeof window !== "undefined" &&
          window.adsbygoogle &&
          adRef.current
        ) {
          const adElement = adRef.current;
          if (adElement.offsetWidth === 0) {
            adElement.style.minWidth = "300px"; // Set a minimum width
            adElement.style.width = "100%";
            adElement.style.height = "auto";
          }
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (typeof window !== "undefined") {
      if (window.adsbygoogle) {
        loadAd();
      } else {
        window.addEventListener("load", loadAd);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", loadAd);
      }
    };
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{
        display: "block",
        minWidth: "300px",
        width: "100%",
        height: "auto",
      }}
      data-ad-client="ca-pub-1674144837923693"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdComponent;
