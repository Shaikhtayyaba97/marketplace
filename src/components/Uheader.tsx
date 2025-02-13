import Link from "next/link";

export default function Uheader() {
  return (
    <nav className="bg-white flex justify-center items-center w-full py-4">
      <div className=" flex  flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-4xl">
        <Link href="/" className="hover:text-red-500 text-black text-lg">
          Home
        </Link>
        <Link href="/women" className="hover:text-red-500 text-black text-lg">
          Women
        </Link>
        <Link href="/men" className="hover:text-red-500 text-black text-lg">
          Men
        </Link>
        <Link href="/kids" className="hover:text-red-500 text-black text-lg">
          Kids
        </Link>
        <Link href="/customize" className="hover:text-red-500 text-black text-lg">
          Customize
        </Link>
      </div>
    </nav>
  );
}