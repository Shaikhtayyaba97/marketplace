import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa"; // Import the WhatsApp icon

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Link href="https://wa.me/03363856003" passHref>
        <div className="bg-green-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all">
          {/* WhatsApp Icon from React Icons */}
          <FaWhatsapp className="text-white w-16 h-16" size={32} />
        </div>
      </Link>
    </div>
  );
};

export default WhatsAppButton;