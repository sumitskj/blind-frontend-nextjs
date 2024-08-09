'use client';
import { useEffect } from "react";

const AdSquareComponent = ({ adSlot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      class="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-1674144837923693"
      data-ad-slot="8728353163"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSquareComponent;
