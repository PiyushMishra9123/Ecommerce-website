function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-12 sm:mt-16 lg:mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">

        {/* ================= FOOTER CONTENT ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* ================= BRAND ================= */}

          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                🛍️
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold">
                Shop<span className="text-indigo-400">Kart</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-sm">
              Your one-stop destination for electronics, mobiles and
              accessories.
            </p>
          </div>

          {/* ================= COMPANY ================= */}

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Company
            </h3>

            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-slate-400">
              <li className="hover:text-white transition cursor-pointer">
                About Us
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Careers
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* ================= HELP ================= */}

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Help
            </h3>

            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-slate-400">
              <li className="hover:text-white transition cursor-pointer">
                Payments
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Shipping
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Returns
              </li>
            </ul>
          </div>

          {/* ================= SOCIAL ================= */}

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Follow Us
            </h3>

            <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-slate-400">
              <li className="hover:text-pink-400 transition cursor-pointer">
                Instagram
              </li>

              <li className="hover:text-blue-400 transition cursor-pointer">
                LinkedIn
              </li>

              <li className="hover:text-slate-200 transition cursor-pointer">
                GitHub
              </li>
            </ul>
          </div>
        </div>

        {/* ================= COPYRIGHT ================= */}

        <div className="border-t border-slate-800 mt-8 sm:mt-10 lg:mt-12 pt-5 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            © 2026 ShopKart. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;