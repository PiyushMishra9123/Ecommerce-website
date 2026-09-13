function Footer() {
  return ( 
  <footer className="bg-slate-900 text-white mt-16"> <div className="max-w-7xl mx-auto px-6 py-10">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-3">
          ShopKart
          </h2>
          <p className="text-gray-400">
            Your one stop destination for shopping electronics, mobiles and accessories.
        </p>
      </div>
      <div>
        <h3 className="font-bold mb-3">
          Company
        </h3>
        <ul className="space-y-2 text-gray-400">
          <li>About Us</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-3">
          Help
        </h3>

        <ul className="space-y-2 text-gray-400">
          <li>Payments</li>
          <li>Shipping</li>
          <li>Returns</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-3">
          Follow Us
        </h3>

        <ul className="space-y-2 text-gray-400">
          <li>Instagram</li>
          <li>LinkedIn</li>
          <li>GitHub</li>
        </ul>
      </div>

    </div>
    <hr className="my-6 border-gray-700" />
    <p className="text-center text-gray-400"> © 2026 ShopKart. All Rights Reserved.</p>

  </div>
</footer>


);
}
export default Footer;
