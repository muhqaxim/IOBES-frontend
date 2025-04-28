const Mission = () => (
    <section className="py-16 bg-gradient-to-r font-inter from-gray-50 via-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Mission Title */}
            <h1 className="text-lg lg:text-xl font-semibold uppercase mb-2 tracking-wider">
                __Our Mission
            </h1>
            {/* Mission Subheading */}
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold max-w-sm lg:max-w-md xl:max-w-xl mx-auto text-gray-900 mb-6">
                Empowering the Future of Education with AI
            </h2>

            {/* Mission Description */}
            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed mx-auto max-w-5xl">
                Our mission is to transform educational assessments using cutting-edge AI technology. We aim to enhance academic
                integrity and align examinations with Course Learning Outcomes (CLOs).
            </p>

            {/* Icon Section */}
            <div className="flex justify-center gap-8 mt-12 flex-wrap">
                <div
                    className="relative px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-blue-600 font-semibold rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:text-white group"
                >
                    <span className="absolute inset-0 transform bg-white scale-x-0 text-blue-600 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                    <span className="relative z-50 group-hover:text-blue-600">AI Technology</span>
                </div>

                <div
                    className="relative px-6 py-3 text-white bg-gradient-to-r from-green-600 to-green-700 border-2 border-green-600 font-semibold rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:text-white group"
                >
                    <span className="absolute inset-0 transform bg-white scale-x-0 text-green-600 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                    <span className="relative z-50 group-hover:text-green-600">Academic Integrity</span>
                </div>

                <div
                    className="relative px-6 py-3 text-white bg-gradient-to-r from-orange-600 to-orange-700 border-2 border-orange-600 font-semibold rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:text-white group"
                >
                    <span className="absolute inset-0 transform bg-white scale-x-0 text-orange-600 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                    <span className="relative z-50 group-hover:text-orange-600">Course Alignment</span>
                </div>
            </div>
        </div>
    </section>
);

export default Mission;
