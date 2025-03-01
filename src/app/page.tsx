import WhatsAppButton from "@/components/Whatup";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 transition-all duration-300 bg-white text-black dark:bg-black dark:text-white relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/30 to-transparent dark:from-yellow-600/30 pointer-events-none"></div>

      {/* Floating Decorative Circles */}
      <div className="absolute top-10 left-5 w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-5 w-16 h-16 bg-yellow-500 rounded-full blur-2xl opacity-25"></div>

      {/* Store Branding */}
      <div className="relative z-10 mt-10 sm:mt-0">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-500 tracking-wide uppercase drop-shadow-lg">
          A2Z Store
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-3 max-w-md">
          Your one-stop shop for premium cosmetics & gifts.
        </p>
        <div className="w-40 h-1 bg-yellow-500 mx-auto mt-3 rounded"></div>
      </div>

      {/* Animated Call-to-Action Button */}
      <a
        href="#shop"
        className="mt-8 bg-yellow-500 text-black text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all hover:scale-105"
      >
        Explore Products
      </a>

      {/* WhatsApp Button (Fixed in Bottom-Right) */}
      <div className="absolute bottom-10 right-10">
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default HomePage;