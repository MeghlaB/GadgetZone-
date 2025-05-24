import { FaPhone, FaMapMarkerAlt, FaFacebookF, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-[#0C1B2A] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold mb-4">SUPPORT</h3>
          <div className="space-y-4">
            <div className="bg-[#101F30] rounded-xl p-4 flex items-center gap-4">
              <FaPhone className="text-xl" />
              <div>
                <p className="text-sm text-gray-400">9 AM - 8.30 PM</p>
                <p className="text-xl font-bold text-[#FF4C4C]">23312</p>
              </div>
            </div>
            <div className="bg-[#101F30] rounded-xl p-4 flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl" />
              <div>
                <p className="text-sm text-gray-400">Store Locator</p>
                <p className="text-[#FF4C4C] font-semibold">Find Our Stores</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-sm font-semibold mb-4">ABOUT US</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300">
            <a href="#">Affiliate Program</a>
            <a href="#">EMI Terms</a>
            <a href="#">Online Delivery</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund and Return Policy</a>
            <a href="#">Star Point Policy</a>
            <a href="#">Blog</a>
            <a href="#">Contact Us</a>
            <a href="#">About Us</a>
            <a href="#">Terms and Conditions</a>
            <a href="#">Career</a>
            <a href="#">Brands</a>
          </div>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-sm font-semibold mb-4">STAY CONNECTED</h3>
          <p className="text-white font-bold mb-2">ORYON Ltd</p>
          <p className="text-sm text-gray-300 mb-2">
            Head Office: 28 Kazi Nazrul Islam Ave,<br />Navana Zohura Square, Dhaka 1000
          </p>
          <p className="text-sm text-gray-300 mb-2">Developer: Meghla Biswas, Joy Halder</p>
          <p className="text-sm text-gray-300 mb-2">Email: </p>
          <p className="text-sm text-red-400 mb-4">webteam@startechbd.com</p>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl text-white">
            <a href=""><FaWhatsapp /></a>
            <a href="https://www.facebook.com/joy.halder.215371"><FaFacebookF /></a>
            <a href=""><FaYoutube /></a>
            <a href=""><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>Experience ORYON App on your mobile:</p>
        <div className="flex gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-10"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-10"
          />
        </div>
        <p className="text-xs w-full md:w-auto text-center">© 2025 Star Tech Ltd | All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
