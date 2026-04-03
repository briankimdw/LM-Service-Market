import { cn } from "@/lib/utils";
import {
  FaShoppingBasket,
  FaWineBottle,
  FaCookieBite,
  FaTicketAlt,
  FaHome,
  FaStar,
  FaHeart,
  FaMapMarkerAlt,
  FaHandshake,
  FaClock,
  FaSmile,
  FaStore,
} from "react-icons/fa";

const services = [
  {
    title: "Groceries & Essentials",
    description:
      "Fresh basics, canned goods, bread, eggs, milk, and everything you need without the big-box hassle.",
    icon: FaShoppingBasket,
  },
  {
    title: "Beer & Wine",
    description:
      "One of Midtown's best selections of craft beer, imports, and wine. Cold and ready to go.",
    icon: FaWineBottle,
  },
  {
    title: "Snacks & Drinks",
    description:
      "Chips, candy, energy drinks, sodas, coffee, and quick bites for when you're on the move.",
    icon: FaCookieBite,
  },
  {
    title: "Lottery & More",
    description:
      "Scratch-offs, Powerball, Mega Millions, and all your favorite Georgia Lottery games.",
    icon: FaTicketAlt,
  },
  {
    title: "Household Items",
    description:
      "Cleaning supplies, toiletries, batteries, phone chargers, and those little things you always forget.",
    icon: FaHome,
  },
  {
    title: "Friendly Service",
    description:
      "Richard and the team know their regulars by name. You're not a number here — you're a neighbor.",
    icon: FaSmile,
  },
];

const whyChooseUs = [
  {
    title: "Since 1987",
    description:
      "We've been serving the Midtown neighborhood for nearly four decades. L&M isn't just a store — it's a neighborhood institution.",
    icon: FaStar,
  },
  {
    title: "Real Convenience",
    description:
      "No long lines, no giant parking lots, no self-checkout headaches. Get in, get what you need, and get on with your day.",
    icon: FaClock,
  },
  {
    title: "Community First",
    description:
      "Richard knows the neighborhood and the neighborhood knows Richard. This is a store built on relationships, not transactions.",
    icon: FaHeart,
  },
  {
    title: "Right in Midtown",
    description:
      "Located on Argonne Ave NE, we're just steps from where you live, work, and play. Your neighborhood market, always nearby.",
    icon: FaMapMarkerAlt,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ====== HERO BANNER ====== */}
      <section className="page-hero py-12 md:py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About L&M Service Market
          </h1>
          <p className="text-[#FFF9F2]/60 text-lg max-w-2xl mx-auto">
            Midtown Atlanta&apos;s neighborhood convenience store since day one
          </p>
        </div>
      </section>

      {/* ====== OUR STORY ====== */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">
                The Market
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3C2A] mb-6">
                Your Corner Store, Your Community
              </h2>
              <div className="prose prose-lg max-w-none space-y-4">
                <p className="text-gray-600 leading-relaxed text-[17px]">
                  L&M Service Market is the kind of store that big cities need
                  more of. Tucked into the heart of Midtown Atlanta at 785
                  Argonne Ave NE, we&apos;ve been the go-to spot for groceries,
                  cold beer, wine, snacks, lottery tickets, and everyday
                  essentials since 1987.
                </p>
                <p className="text-gray-600 leading-relaxed text-[17px]">
                  We&apos;re not a chain. We&apos;re not a franchise. We&apos;re
                  a real neighborhood market run by real people who care about
                  the community. Whether you need a gallon of milk on a Tuesday
                  night or a six-pack for the weekend, L&M has you covered —
                  with a smile and maybe some conversation, too.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl aspect-video flex items-center justify-center border border-[var(--border)]">
              <div className="text-center text-gray-400 p-8">
                <FaStore className="text-6xl mb-3 mx-auto" />
                <p className="text-sm font-medium">Store photo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MEET RICHARD ====== */}
      <section className="py-12 md:py-20 bg-[var(--surface-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl w-72 h-72 flex items-center justify-center border border-[var(--border)]">
                <div className="text-center text-gray-400">
                  <FaHandshake className="text-6xl mb-2 mx-auto" />
                  <p className="text-sm font-medium">Richard&apos;s photo</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">
                The Heart of L&M
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3C2A] mb-3">
                Meet Richard
              </h2>
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6",
                  "bg-[#D4451A]/10 text-[#D4451A] border border-[#D4451A]/20"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4451A]" />
                25+ Years Serving Midtown
              </div>
              <p className="text-gray-600 leading-relaxed text-[17px]">
                If you&apos;ve been to L&M, you know Richard. He&apos;s the
                kind of owner who remembers your name, asks about your family,
                and always has a recommendation when you can&apos;t decide on a
                beer. Richard has poured his heart into this market since 1987,
                turning a small service market into a true
                neighborhood landmark. He&apos;s not just running a business —
                he&apos;s taking care of a community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WHAT WE CARRY ====== */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">
              Products & Services
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A3C2A] mb-4">
              What We Carry
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Everything you need, right around the corner
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={cn(
                    "bg-[var(--surface-alt)] rounded-2xl p-7 text-center",
                    "border border-[var(--border)]",
                    "hover:border-[#D4451A]/30 hover:shadow-xl hover:shadow-[#D4451A]/5 transition-all duration-400 hover:-translate-y-1"
                  )}
                >
                  <div className="w-14 h-14 mx-auto bg-[#D4451A]/10 rounded-2xl flex items-center justify-center mb-5">
                    <Icon className="text-2xl text-[#D4451A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1A3C2A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section className="py-12 md:py-20 bg-[var(--surface-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[#D4451A] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Promise
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A3C2A] mb-4">
              Why L&M?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              There&apos;s a reason the neighborhood keeps coming back
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={cn(
                    "bg-white rounded-2xl p-7 text-center",
                    "border border-[var(--border)]",
                    "hover:border-[#D4451A]/30 hover:shadow-xl hover:shadow-[#D4451A]/5 transition-all duration-400 hover:-translate-y-1"
                  )}
                >
                  <div className="w-14 h-14 mx-auto bg-[#D4451A]/10 rounded-2xl flex items-center justify-center mb-5">
                    <Icon className="text-2xl text-[#D4451A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1A3C2A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-12 md:py-20 bg-[#1A3C2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaMapMarkerAlt className="text-4xl text-[#D4451A] mx-auto mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Come See Us in Midtown
          </h2>
          <p className="text-[#FFF9F2]/70 text-lg mb-8 max-w-2xl mx-auto">
            L&M Service Market is located at 785 Argonne Ave NE, Atlanta, GA
            30308. Stop by, say hi to Richard, and grab what you need. We&apos;re
            your neighborhood store — always have been, always will be.
          </p>
          <a
            href="https://maps.google.com/?q=785+Argonne+Ave+NE+Atlanta+GA+30308"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white",
              "bg-[#D4451A] hover:bg-[#B83A16] transition-colors duration-300",
              "shadow-lg shadow-[#D4451A]/25"
            )}
          >
            <FaMapMarkerAlt className="text-sm" />
            Get Directions
          </a>
        </div>
      </section>
    </>
  );
}
