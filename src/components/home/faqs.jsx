import { useState } from 'react';

const faqs = [
    { question: "What is the FYP Portal?", answer: "An AI-powered platform for exam management." },
    { question: "Who can use this system?", answer: "Students, instructors, and administrators." },
    { question: "Is my data secure?", answer: "Yes, we use encryption and secure storage." },
    { question: "How do I create an account?", answer: "Visit the sign-up page and follow the instructions." },
    { question: "Can I reset my password?", answer: "Yes, you can reset your password using the 'Forgot Password' link." },
    
];

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faqs" className=" bg-white px-2 font-inter">
            {/* Header Section */}
            <div className="text-center mb-6">
                <h1 className="text-lg lg:text-xl font-semibold uppercase mb-4 text-[#141E30]">
                    __FAQs
                </h1>
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold max-w-sm lg:max-w-md xl:max-w-xl mx-auto text-gray-900">
                    Explore Our FAQ Section for Helpful Information
                </h2>
            </div>

            {/* Content Section */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 lg:px-24">
                {/* Left Section - Image */}
                <div className="w-full lg:w-1/2 mt-8 md:-mt-6 ">
                    <img
                        src="FAQ.svg"
                        alt="FAQ illustration"
                        className="w-full max-w-md mx-auto"
                    />
                </div>

                {/* Right Section - FAQ List */}
                <div className="w-full lg:w-1/2 md:px-6 lg:px-16 space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[#141E30] shadow-sm overflow-hidden"
                        >
                            <button
                                className="flex justify-between items-center w-full px-4 py-3 text-left text-gray-800 font-semibold text-lg focus:outline-none hover:bg-blue-100 transition-all"
                                onClick={() => toggleAnswer(index)}
                                aria-expanded={activeIndex === index}
                                aria-controls={`faq-${index}`}
                            >
                                {faq.question}
                                <svg
                                    className={`w-6 h-6 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {activeIndex === index && (
                                <div
                                    id={`faq-${index}`}
                                    className="px-4 py-3 text-gray-600 "
                                >
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQs;
