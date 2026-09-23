"use client";

interface FooterProps {
  onLinkClick: (title: string, body: string) => void;
  onNavigateOrders: () => void;
  onSelectCategory: (category: string) => void;
}

export default function Footer({ onLinkClick, onNavigateOrders, onSelectCategory }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#232f3e] text-white text-xs mt-16 select-none">
      {/* Back to top button */}
      <div 
        onClick={scrollToTop}
        className="bg-[#37475a] text-center py-3 text-sm font-medium cursor-pointer hover:bg-[#485769] transition-colors"
      >
        Back to top
      </div>

      {/* Main Link Columns */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#3a4553]">
        {/* Column 1: Get to Know Us */}
        <div>
          <h4 className="font-bold text-sm mb-3 text-white">Get to Know Us</h4>
          <ul className="space-y-2.5 text-[#cccccc]">
            <li><button onClick={() => onLinkClick("Careers", "Explore career opportunities across software development, product design, logistics, and AI research at Amazon.")} className="hover:underline text-left cursor-pointer">Careers</button></li>
            <li><button onClick={() => onLinkClick("Blog", "Read inspiring stories about customer innovations, community impact, and technology updates on the official Amazon blog.")} className="hover:underline text-left cursor-pointer">Blog</button></li>
            <li><button onClick={() => onLinkClick("About Amazon", "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.")} className="hover:underline text-left cursor-pointer">About Amazon</button></li>
            <li><button onClick={() => onLinkClick("Investor Relations", "Access quarterly financial results, SEC filings, annual shareholder letters, and corporate governance documents.")} className="hover:underline text-left cursor-pointer">Investor Relations</button></li>
            <li><button onClick={() => { scrollToTop(); onSelectCategory("Electronics"); }} className="hover:underline text-left cursor-pointer">Amazon Devices</button></li>
            <li><button onClick={() => onLinkClick("Amazon Science", "Explore how Amazon researchers and scientists are pushing the boundaries in machine learning, robotics, and cloud computing.")} className="hover:underline text-left cursor-pointer">Amazon Science</button></li>
          </ul>
        </div>

        {/* Column 2: Make Money with Us */}
        <div>
          <h4 className="font-bold text-sm mb-3 text-white">Make Money with Us</h4>
          <ul className="space-y-2.5 text-[#cccccc]">
            <li><button onClick={() => onLinkClick("Sell products on Amazon", "Build your digital storefront, manage inventory with Seller Central, and reach millions of shoppers worldwide.")} className="hover:underline text-left cursor-pointer">Sell products on Amazon</button></li>
            <li><button onClick={() => onLinkClick("Sell on Amazon Business", "Reach enterprise and business buyers with specialized bulk pricing and streamlined B2B wholesale tools.")} className="hover:underline text-left cursor-pointer">Sell on Amazon Business</button></li>
            <li><button onClick={() => onLinkClick("Sell apps on Amazon", "Publish your mobile applications, cross-platform games, and software utilities on the Amazon Appstore.")} className="hover:underline text-left cursor-pointer">Sell apps on Amazon</button></li>
            <li><button onClick={() => onLinkClick("Become an Affiliate", "Earn commissions by recommending top-tier products and creating shoppable content through the Amazon Associates program.")} className="hover:underline text-left cursor-pointer">Become an Affiliate</button></li>
            <li><button onClick={() => onLinkClick("Advertise Your Products", "Boost product visibility and drive sales growth with sponsored ads, display placements, and targeted keyword campaigns.")} className="hover:underline text-left cursor-pointer">Advertise Your Products</button></li>
            <li><button onClick={() => onLinkClick("Self-Publish with Us", "Publish your books, eBooks, and poetry collections independently with Kindle Direct Publishing (KDP).")} className="hover:underline text-left cursor-pointer">Self-Publish with Us</button></li>
            <li><button onClick={() => onLinkClick("Host an Amazon Hub", "Grow your local retail business earnings by securely receiving and holding neighborhood package pickups.")} className="hover:underline text-left cursor-pointer">Host an Amazon Hub</button></li>
          </ul>
        </div>

        {/* Column 3: Amazon Payment Products */}
        <div>
          <h4 className="font-bold text-sm mb-3 text-white">Amazon Payment Products</h4>
          <ul className="space-y-2.5 text-[#cccccc]">
            <li><button onClick={() => onLinkClick("Amazon Business Card", "Earn 5% back on purchases or enjoy flexible revolving credit and extended payment terms for business expenses.")} className="hover:underline text-left cursor-pointer">Amazon Business Card</button></li>
            <li><button onClick={() => onLinkClick("Shop with Points", "Redeem reward points from eligible credit cards and partner loyalty programs directly at checkout.")} className="hover:underline text-left cursor-pointer">Shop with Points</button></li>
            <li><button onClick={() => onLinkClick("Reload Your Balance", "Top up your Amazon Pay balance securely for swift, lightning-fast 1-click checkouts.")} className="hover:underline text-left cursor-pointer">Reload Your Balance</button></li>
            <li><button onClick={() => onLinkClick("Amazon Currency Converter", "Automatically calculate and pay in your preferred local currency when shopping across international Amazon marketplaces.")} className="hover:underline text-left cursor-pointer">Currency Converter</button></li>
          </ul>
        </div>

        {/* Column 4: Let Us Help You */}
        <div>
          <h4 className="font-bold text-sm mb-3 text-white">Let Us Help You</h4>
          <ul className="space-y-2.5 text-[#cccccc]">
            <li><button onClick={onNavigateOrders} className="hover:underline text-left cursor-pointer">Your Account & Orders</button></li>
            <li><button onClick={() => onLinkClick("Shipping Rates & Policies", "Review standard transit times, expedited shipping fees, free delivery eligibility thresholds, and courier guidelines.")} className="hover:underline text-left cursor-pointer">Shipping Rates & Policies</button></li>
            <li><button onClick={() => onLinkClick("Returns & Replacements", "Easily initiate return requests, print pre-paid courier labels, schedule doorstep pickups, or track instant refunds.")} className="hover:underline text-left cursor-pointer">Returns & Replacements</button></li>
            <li><button onClick={() => onLinkClick("Manage Your Content and Devices", "Manage your digital library, downloaded mobile apps, registered Kindle e-readers, and Cloud storage preferences.")} className="hover:underline text-left cursor-pointer">Manage Your Content and Devices</button></li>
            <li><button onClick={() => onLinkClick("Help Center", "Get 24/7 customer support via live chat, email ticket assistance, or scheduled phone callbacks from customer service specialists.")} className="hover:underline text-left cursor-pointer">Help Center</button></li>
          </ul>
        </div>
      </div>

      {/* Brand Logo & Language/Currency Selector Section */}
      <div className="bg-[#232f3e] py-10 border-b border-[#3a4553]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 px-4">
          <div className="cursor-pointer" onClick={scrollToTop}>
            <span className="text-3xl font-bold tracking-tight">
              amazon<span className="text-[#febd69]">.com</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button onClick={() => onLinkClick("Language Settings", "Current storefront language is set to English (EN). You can change regional display preferences here.")} className="border border-[#848688] px-4 py-2 rounded-sm hover:border-white transition-colors cursor-pointer flex items-center gap-2">
              <span>🌐 English</span>
            </button>
            <button onClick={() => onLinkClick("Currency Settings", "Current payment currency is set to ₹ INR - Indian Rupee. Exchange rates update daily.")} className="border border-[#848688] px-4 py-2 rounded-sm hover:border-white transition-colors cursor-pointer">
              ₹ INR - Indian Rupee
            </button>
            <button onClick={() => onLinkClick("Country Settings", "Current regional shipping destination is United States / International Stores.")} className="border border-[#848688] px-4 py-2 rounded-sm hover:border-white transition-colors cursor-pointer flex items-center gap-2">
              <span>🇺🇸 United States</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Sub-brand Footer Matrix (Amazon Subs) */}
      <div className="bg-[#131921] py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-y-6 gap-x-4 text-[10px] text-[#999999]">
          <div>
            <button onClick={() => onLinkClick("AbeBooks", "AbeBooks offers books, rare art pieces, and vintage collectibles from independent sellers across the globe.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">AbeBooks</button>
            <span className="block">Books, art<br/>& collectibles</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Amazon Web Services (AWS)", "AWS provides reliable, scalable, and secure cloud computing services powering millions of global enterprises.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Amazon Web Services</button>
            <span className="block">Scalable Cloud<br/>Computing Services</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Audible", "Audible lets you download best-selling audiobooks, podcasts, and exclusive audio performances.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Audible</button>
            <span className="block">Download<br/>Audiobooks</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("IMDb", "IMDb is the authoritative source for ratings, trailers, movie reviews, and celebrity trivia.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">IMDb</button>
            <span className="block">Movies, TV<br/>& Celebrities</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Shopbop", "Shopbop curates high-end contemporary designer fashion brands and luxury apparel.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Shopbop</button>
            <span className="block">Designer<br/>Fashion Brands</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Amazon Business", "Amazon Business is a one-stop store providing commercial supplies and tools for organizations of all sizes.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Amazon Business</button>
            <span className="block">Everything For<br/>Your Business</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Prime Video Direct", "Prime Video Direct enables video creators and independent distributors to publish directly to Prime members.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Prime Video Direct</button>
            <span className="block">Video Distribution<br/>Made Easy</span>
          </div>

          <div>
            <button onClick={() => onLinkClick("Zappos", "Zappos is renowned for online shoe shopping, clothing lines, and legendary customer service.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Zappos</button>
            <span className="block">Shoes &<br/>Clothing</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Ring", "Ring smart home security systems include video doorbells, security cameras, and alarm kits.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Ring</button>
            <span className="block">Smart Home<br/>Security Systems</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("eero WiFi", "eero mesh WiFi routers stream ultra-fast 4K video seamlessly in every single room of your house.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">eero WiFi</button>
            <span className="block">Stream 4K Video<br/>in Every Room</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Blink", "Blink offers affordable, battery-powered smart security cameras and monitoring systems for home safety.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Blink</button>
            <span className="block">Smart Security<br/>for Every Home</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Goodreads", "Goodreads helps book lovers discover recommendations, ratings, and peer reviews for millions of books.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Goodreads</button>
            <span className="block">Book reviews<br/>& recommendations</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("Box Office Mojo", "Box Office Mojo tracks real-time box office earnings, ticket sales, and cinematic release data.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">Box Office Mojo</button>
            <span className="block">Find Movie<br/>Box Office Data</span>
          </div>
          <div>
            <button onClick={() => onLinkClick("PillPack", "PillPack simplifies your prescription medication management by sorting meds into pre-sorted packets delivered directly.")} className="block text-left hover:underline font-bold text-[#dddddd] cursor-pointer">PillPack</button>
            <span className="block">Pharmacy<br/>Simplified</span>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="mt-12 text-center text-gray-400 text-[11px] space-y-1">
          <div className="flex justify-center space-x-6">
            <button onClick={() => onLinkClick("Conditions of Use & Sale", "Review the legal terms, customer agreement conditions, and policies governing purchases.")} className="hover:underline cursor-pointer">Conditions of Use & Sale</button>
            <button onClick={() => onLinkClick("Privacy Notice", "Learn how your personal information is gathered, encrypted, stored, and utilized securely.")} className="hover:underline cursor-pointer">Privacy Notice</button>
            <button onClick={() => onLinkClick("Interest-Based Ads", "Understand how interest-based advertising works and how you can manage your ad preferences.")} className="hover:underline cursor-pointer">Interest-Based Ads</button>
          </div>
          <p>© 1996-2026, Amazon.com, Inc. or its affiliates. Full-Stack Next.js Amazon Clone by Sanya Chauhan.</p>
        </div>
      </div>
    </footer>
  );
}