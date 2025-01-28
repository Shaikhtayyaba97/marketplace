import Link from "next/link";

export default function Uheader() {
  return (
    <nav className="bg-[#6EC207] flex justify-center items-center w-full py-4">
      <div className="flex flex-wrap justify-center space-x-6 w-full max-w-4xl">
      <Link href="/" className="hover:text-gray-300 text-white text-lg">
          Home
        </Link>
        <Link href="/women" className="hover:text-gray-300 text-white text-lg">
          Women
        </Link>
        <Link href="/men" className="hover:text-gray-300 text-white text-lg">
          Men
        </Link>
        <Link href="/kids" className="hover:text-gray-300 text-white text-lg">
          Kids
        </Link>
        <Link href="/customize" className="hover:text-gray-300 text-white text-lg">
          Customize
        </Link>

      </div>
    </nav>
  );
}