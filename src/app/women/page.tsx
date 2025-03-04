import Link from "next/link";
import Image from "next/image";

const MenPage = () => {
  const subcategories = [
  
    { name: "Ring", image: "/wring.jpg" },
    { name: "Watch", image: "/wwatch.jpg" },
    { name: "Bracelets", image: "/wbracelet.jpg" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Women Categories</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subcategories.map((subcategory) => (
            <li key={subcategory.name} className="text-center">
              <Link
                href={`/women/${subcategory.name.toLowerCase().replace(" ", "-")}`}
                className="block group"
              >
                {/* Image with rounded shape */}
                <div className="w-32 h-32 mx-auto overflow-hidden rounded-full mb-4 group-hover:opacity-80 transition-opacity">
                  <Image
                    src={subcategory.image}
                    alt={subcategory.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Button */}
                <button className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                  {subcategory.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenPage;