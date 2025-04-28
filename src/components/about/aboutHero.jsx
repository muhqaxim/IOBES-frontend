const AboutHero = () => (
  <header
    className="relative bg-cover bg-center h-[70vh] max-h-screen 2xl:h-[400px] font-inter pt-24 lg:pt-32 xl:pt-36  flex items-start justify-start py-10 p-6"
    style={{ backgroundImage: "url('/AboutHero.jpg')" }}
  >
    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#141E30] to-[#243B55] opacity-70"></div>

    {/* Content aligned to the left */}
    <div className="relative z-10 text-left text-white max-w-3xl mx-auto md:max-w-7xl w-full">
      <h1 className="text-2xl text-left text-nowrap md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold font-inter mb-4 leading-tight text-white animate__animated animate__fadeIn animate__delay-2s">
        About Us
      </h1>
      <p className=" text-lg xl:text-xl mb-6 leading-relaxed max-w-xl text-white text-justify  animate__animated animate__fadeIn animate__delay-2s md:w-[50%]">
        Discover the AI-Powered Outcome-Based Examination System by the University Institute of Information Technology,
        PMAS-Arid Agriculture University, Rawalpindi.
      </p>
    </div>
  </header>
);

export default AboutHero;
