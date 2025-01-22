import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <div className="w-full h-auto flex justify-center">
        <Image
          src="/hero.png"
          width={1000} // Set a large width to maintain aspect ratio
          height={500} // Set a large height to maintain aspect ratio
          alt="herosection"
          className="object-contain max-w-full h-auto" // Responsive styles
        />
      </div>
    </div>
  );
};

export default HomePage;