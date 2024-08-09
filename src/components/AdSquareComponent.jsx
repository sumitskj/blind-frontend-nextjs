'use client';
import { useEffect, useRef } from "react";

const AdSquareComponent = ({ adSlot }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (adRef.current) {
          const adElement = adRef.current;
          if (adElement.offsetWidth === 0) {
            adElement.style.width = '100%';
          }
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (window.adsbygoogle) {
      loadAd();
    } else {
      window.addEventListener('load', loadAd);
    }

    return () => {
      window.removeEventListener('load', loadAd);
    };
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-1674144837923693"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSquareComponent;