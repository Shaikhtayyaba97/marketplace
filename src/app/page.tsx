import ImageSlider from "@/components/Home";
import WhatsAppButton from "@/components/Whatup";
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
      <div className="bg-white text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="relative w-full h-auto bg-gray-300 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <Link href={section.link}>
              <div className="relative w-full">
                {/* Image */}
                <img
                  src={section.image}
                  alt={section.name}
                  className="w-full h-72 object-cover rounded-t-lg transition-all duration-300"
                />
                {/* Heading Below Image */}
                <div className="bg-black/70 mb-7 text-white text-center p-4 rounded-b-lg">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider uppercase text-shadow-md">
                    {section.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <WhatsAppButton/>
    </div>
  );
};

export default HomePage;