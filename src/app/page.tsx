import ImageSlider from "@/components/Home";
import Link from "next/link";

const sections = [
  { name: "Women", link: "/women", image: "/10.jpg" },
  { name: "Men", link: "/men", image: "/3.jpg" },
  { name: "Kids", link: "/kids", image: "/7.jpg" },
  { name: "Customized", link: "/customize", image: "/clocket.jpg" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ImageSlider Component */}
      <ImageSlider />

      {/* Below Image Slider: Display Section Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="relative w-full h-72 bg-gray-300 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <Link href={section.link}>
              <div className="w-full h-full relative cursor-pointer">
                <img
                  src={section.image}
                  alt={section.name}
                  className="w-full h-full object-cover rounded-lg transition-all duration-300"
                />
                {/* Stylish Overlay for heading */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-black text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-3xl font-extrabold tracking-wide uppercase text-shadow-lg">
                    {section.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;