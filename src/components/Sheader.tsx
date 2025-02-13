// Sheader.tsx
'use client'

export default function Sheader() {
    return (


      
      <div style={{backgroundColor: "#7e5c14"}} className=" text-white h-12 flex items-center justify-center">
        <p className="text-lg text-2xl whitespace-nowrap animate-marquee">
          Free Shipping On Order Above 3000!
        </p>
  
        <style jsx>{`
          .animate-marquee {
            display: inline-block;
            animation: marquee 10s linear infinite;
          }
  
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </div>
    );
  }