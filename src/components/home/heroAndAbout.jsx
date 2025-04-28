// import { useEffect, useState } from "react";

// const HeroAboutSection = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const slides = [
//         {
//             title: "Welcome to AI-OBES",
//             description:
//                 "Step into the future of learning with tools designed to make your education journey smoother and smarter. Our AI-powered features help create personalized questions, grade assignments quickly, and analyze performance effortlessly. This portal is here to save you time and help you focus on what truly matters—learning and growth.",
//             image: "hero1.svg",
//         },
//         {
//             title: "Empowering Education",
//             description:
//                 "Education is evolving, and we’re here to support you every step of the way. With the power of AI, we make assessments easier and faster, giving students and educators more time to focus on meaningful learning. Let’s simplify tasks and create a more rewarding educational experience together.",
//             image: "hero2.svg",
//         },
//         {
//             title: "Future-Ready Learning",
//             description:
//                 "Prepare for a smarter way of managing your exams and tracking progress. Our AI-driven tools are built to help you stay ahead by simplifying exam creation, improving performance monitoring, and ensuring a seamless learning process. Discover the future of education with features that truly work for you.",
//             image: "hero3.svg",
//         },
//     ];


//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prev) => (prev + 1) % slides.length);
//         }, 2000); // Slides change every 5 seconds

//         return () => clearInterval(interval);
//     }, [slides.length]);

//     // bg-gradient-to-tr from-[#79A3FF] to-[#A8D8F0]
//     return (
//         <section className="font-inter">
//             {/* Hero Section */}
//             <div className="relative pt-20 lg:pt-16 xl:pt-12 max-h-screen bg-[#141E30] border-b border-black">
//                 {/* Carousel */}
//                 <div className="h-full overflow-hidden ">
//                     <div
//                         className="flex transition-transform duration-1000 ease-in-out"
//                         style={{
//                             transform: `translateX(-${currentSlide * 100}%)`,
//                         }}
//                     >
//                         {slides.map((slide, index) => (
//                             <div
//                                 key={index}
//                                 className="min-w-full flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16"
//                             >
//                                 {/* Left Section */}
//                                 <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
//                                     <h1 className="text-2xl text-left text-nowrap md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold font-inter mb-4 leading-tight text-white">
//                                         {slide.title}
//                                     </h1>
//                                     <p className="text-lg xl:text-xl mb-6 leading-relaxed max-w-xl text-white text-justify">
//                                         {slide.description}
//                                     </p>
//                                 </div>
//                                 {/* Right Section */}
//                                 <div className="hidden md:block md:w-1/2 xl:max-w-xl">
//                                     <img
//                                         src={slide.image}
//                                         alt="Hero Slide"
//                                         className="w-full h-auto object-cover"
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* About Section */}
//             <div
//                 id="about-us"
//                 className="py-2 bg-gray-50 text-black flex flex-col md:flex-row items-center text-center md:text-left"
//             >
//                 <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center">
//                     {/* Left Section (Image) */}
//                     <div className="md:w-1/2">
//                         <img
//                             src="about.svg"
//                             alt="About Us"
//                             className="w-full h-auto object-cover"
//                         />
//                     </div>

//                     {/* Right Section (Text) */}
//                     <div className="md:w-1/2 mb-8 md:mb-0">
//                         <h2 className="text-2xl text-left text-nowrap md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold font-inter mb-4 leading-tight text-black">
//                             About Us
//                         </h2>
//                         <p className="text-lg xl:text-xl mb-6 leading-relaxed max-w-xl text-black text-justify">
//                             Our platform empowers educators and students by leveraging AI for seamless exam management, question generation, and performance tracking.
//                         </p>
//                         <p className="text-lg xl:text-xl mb-6 leading-relaxed max-w-xl text-black text-justify">
//                             We are committed to revolutionizing the education sector with intelligent solutions that make learning and assessment easier.
//                         </p>

//                         <button
//                             className="relative w-48 h-14 bg-white border-2 border-blue-600 text-blue-600 font-semibold text-lg rounded-full overflow-hidden shadow-md transition-all duration-700 ease-in-out hover:shadow-lg hover:text-white group"
//                         >
//                             <span
//                                 className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center"
//                             ></span>
//                             <span
//                                 className="relative z-10 group-hover:text-white"
//                             >
//                                 Get In Touch
//                             </span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroAboutSection;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const HeroAboutSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            title: "Welcome to AI-OBES",
            description:
                "Step into the future of learning with tools designed to make your education journey smoother and smarter. Our AI-powered features help create personalized questions, grade assignments quickly, and analyze performance effortlessly. This portal is here to save you time and help you focus on what truly matters—learning and growth.",
            image: "hero1.svg",
        },
        {
            title: "Empowering Education",
            description:
                "Education is evolving, and we’re here to support you every step of the way. With the power of AI, we make assessments easier and faster, giving students and educators more time to focus on meaningful learning. Let’s simplify tasks and create a more rewarding educational experience together.",
            image: "hero2.svg",
        },
        {
            title: "Future-Ready Learning",
            description:
                "Prepare for a smarter way of managing your exams and tracking progress. Our AI-driven tools are built to help you stay ahead by simplifying exam creation, improving performance monitoring, and ensuring a seamless learning process. Discover the future of education with features that truly work for you.",
            image: "hero3.svg",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000); // Slides change every 4 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="font-inter">
            {/* Hero Section */}
            <div className="relative pt-20 lg:pt-16 xl:pt-12 max-h-screen bg-gradient-to-tr from-[#141E30] to-[#243B55] border-b border-black">
                {/* Carousel */}
                <div className="h-full overflow-hidden">
                    <div
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="min-w-full flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16"
                            >
                                {/* Left Section */}
                                <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
                                    <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg xl:text-xl mb-6 leading-relaxed max-w-xl text-white">
                                        {slide.description}
                                    </p>
                                </div>
                                {/* Right Section */}
                                <div className="hidden md:block md:w-1/2 xl:max-w-xl">
                                    <img
                                        src={slide.image}
                                        alt="Hero Slide"
                                        className="w-full h-auto object-cover drop-shadow-lg"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className=" bg-gray-50 text-black flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center">
                    {/* Left Section (Image) */}
                    <div className="md:w-1/2">
                        <img
                            src="about.svg"
                            alt="About Us"
                            className="w-full h-auto object-cover drop-shadow-lg"
                        />
                    </div>

                    {/* Right Section Content */}
                    <div className="md:w-1/2 mt-8 md:mt-0 space-y-4">
                        <div className="flex flex-col items-start justify-start">
                            <h1 className="text-base lg:text-lg font-semibold uppercase mb-2 text-[#141E30]">
                                __About Us
                            </h1>
                            <h2 className="text-2xl lg:text-3xl xl:text-4xl w-[80%] font-semibold max-w-lg lg:max-w-2xl xl:max-w-3xl  text-gray-900">
                                Get Connected for Enhanced Vision
                            </h2>
                        </div>
                        <p className="text-lg xl:text-xl mb-6 leading-relaxed max-w-xl text-gray-700">
                            Our platform empowers educators and students by leveraging AI for seamless exam management, question generation, and performance tracking.
                        </p>
                        
                        <p className="text-lg xl:text-xl mb-6 leading-relaxed max-w-xl text-gray-700">
                            We are committed to revolutionizing the education sector with intelligent solutions that make learning and assessment easier.
                        </p>

                        <Link to="/about">
                            <button
                                className="relative w-48 h-14 mt-4 bg-gradient-to-r from-[#141E30] to-[#243B55]  text-white font-semibold text-lg rounded-full shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl"
                            >
                                Get In Touch
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroAboutSection;