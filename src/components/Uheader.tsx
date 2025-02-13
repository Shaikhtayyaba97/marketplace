import Link from "next/link";

export default function Uheader() {
  return (
    <nav className="bg-white flex justify-center items-center w-full py-4">
      <div className=" flex  flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-4xl">
        <Link href="/" className="hover:text-red-500 text-black text-lg">
          Home
        </Link>
        <Link href="/men" className="hover:text-red-500 text-black text-lg">
          Men
        </Link>
        <Link href="women/ring" className="hover:text-red-500 text-black text-lg">
          Ring
        </Link>
        <Link href="women/bracelet" className="hover:text-red-500 text-black text-lg">
          Bracelet
        </Link>
        <Link href="women/necklace" className="hover:text-red-500 text-black text-lg">
          Necklace
        </Link>
        <Link href="women/bangle" className="hover:text-red-500 text-black text-lg">
          Bangles
        </Link>
        <Link href="women/set" className="hover:text-red-500 text-black text-lg">
          Women set
        </Link>
      </div>
    </nav>
  );
}