function Footer() {
 return (
  <footer className="bg-slate-950 text-white mt-20 border-t border-slate-800">

    <div className="max-w-7xl mx-auto px-6 py-14">

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              🛍️
            </div>

            <h2 className="text-2xl font-extrabold">
              Shop<span className="text-indigo-400">Kart</span>
            </h2>
          </div>

          <p className="text-slate-400 leading-relaxed">
            Your one-stop destination for
            electronics, mobiles and accessories.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">
            Company
          </h3>

          <ul className="space-y-3 text-slate-400">
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

        <div>
          <h3 className="font-bold text-lg mb-4">
            Help
          </h3>

          <ul className="space-y-3 text-slate-400">
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

        <div>
          <h3 className="font-bold text-lg mb-4">
            Follow Us
          </h3>

          <ul className="space-y-3 text-slate-400">
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

      <div className="border-t border-slate-800 mt-12 pt-6 text-center">
        <p className="text-sm text-slate-500">
          © 2026 ShopKart. All Rights Reserved.
        </p>
      </div>

    </div>
  </footer>
);
}
export default Footer;
