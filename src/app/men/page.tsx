import Link from "next/link";
import Image from "next/image";

const MenPage = () => {
  const subcategories = [
  
    { name: "Ring", image: "/6.jpg" },
    { name: "Watch", image: "/menwatch.jpg" },
    { name: "Bracelet", image: "/menbracelet.jpg" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-7 lg: pt-11">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Men Categories</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7 lg: pt-11">
          {subcategories.map((subcategory) => (
            <li key={subcategory.name} className="text-center">
              <Link
                href={`/men/${subcategory.name.toLowerCase().replace(" ", "-")}`}
                className="block group"
              >
                {/* Image with rounded shape */}
<div className="w-32 h-32 lg:w-48 lg:h-48 mx-auto overflow-hidden rounded-full mb-4 group-hover:opacity-80 transition-opacity">
  <Image
    src={subcategory.image}
    alt={subcategory.name}
    width={192} // Large screen width
    height={192} // Large screen height
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