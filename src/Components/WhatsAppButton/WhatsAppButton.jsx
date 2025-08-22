// src/components/WhatsAppButton.jsx
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+8801859075523";
  const message = "Hello, I want to know more about your products!";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center w-14 h-14 text-white bg-green-500 rounded-full shadow-lg bottom-5 right-5 hover:bg-green-600"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
