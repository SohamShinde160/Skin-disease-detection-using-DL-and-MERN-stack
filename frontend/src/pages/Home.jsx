import Features from "./Feature";
import DiseaseDetection from "./Diseasedetection";
import FunFacts from "./Fact";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Confetti from "react-confetti";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const features = [
    {
      icon: "🤖",
      title: "Smart",
      description:
        "AI Dermatologist is created on the basis of artificial intelligence as a result of joint work of IT specialists and doctors. Our website has the same accuracy as a professional dermatologist.",
    },
    {
      icon: "⏳",
      title: "Simple",
      description:
        "Place your phone near a mole or other formation on the skin and within 1 minute you will find out if there is cause for concern.",
    },
    {
      icon: "📱",
      title: "Accessible",
      description:
        "AI Dermatologist is available anytime, anywhere. Keep your health in check at your fingertips even when you are on the go.",
    },
    {
      icon: "💰",
      title: "Affordable",
      description:
        "AI Dermatologist's leading image analytics features come at an unbeatable price and free of Cost.",
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Memory Map Game logic
  const cardImages = ["🌎", "🗺️", "🏔️", "🏜️", "🏝️", "🏕️"];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showGame) {
      const doubledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({ id: index, emoji: card }));

      setCards(doubledCards);
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setGameWon(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGame]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    setFlippedCards([...flippedCards, index]);
    setMoves(moves + 1);

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      const secondCard = cards[index];

      if (firstCard.emoji === secondCard.emoji) {
        const newMatchedCards = [...matchedCards, firstCard.id, secondCard.id];
        setMatchedCards(newMatchedCards);

        // Check if all cards are matched
        if (newMatchedCards.length === cards.length) {
          setGameWon(true);
        }
      }

      setTimeout(() => setFlippedCards([]), 800);
    }
  };

  const restartGame = () => {
    const doubledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, emoji: card }));

    setCards(doubledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  return (
    <div className="font-semibold relative">
      {/* Navigation */}
      <nav
        className={`border border-gray-200 bg-white z-50 rounded-[50px] shadow-lg py-3 px-4 md:px-8 ${
          window.innerWidth < 768
            ? "fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%]"
            : "absolute w-[90%] mt-4 ml-16"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => navigate("/")}>
            <img
              src="img/newlogo.png"
              alt="Logo"
              className="h-12 scale-125 pl-3 md:h-16 cursor-pointer"
            />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-4 lg:space-x-8 font-semibold text-black text-[15px] lg:text-[17px]">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-blue-500"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/disease-details")}
              className="cursor-pointer hover:text-blue-500"
            >
              Disease Details
            </li>
            <li
              onClick={() => navigate("/team")}
              className="cursor-pointer hover:text-blue-500"
            >
              About our Team
            </li>
            <li>
              <Link
                to="dermatologist-list"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-blue-500"
              >
                Dermatologist List
              </Link>
            </li>
          </ul>

          <div className="hidden md:block">
            <Link
              to="get-started-section"
              smooth={true}
              duration={500}
              className="bg-blue-500 text-white px-4 py-1 md:px-6 md:py-2 rounded-[50px] cursor-pointer hover:bg-blue-600 transition text-sm md:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4">
              <li
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-blue-500 text-center py-2"
              >
                Home
              </li>
              <li
                onClick={() => {
                  navigate("/disease-details");
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-blue-500 text-center py-2"
              >
                Disease Details
              </li>
              <li
                onClick={() => {
                  navigate("/team");
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-blue-500 text-center py-2"
              >
                About our Team
              </li>
              <li
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="text-center py-2"
              >
                <Link
                  to="dermatologist-list"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dermatologist List
                </Link>
              </li>
              <li className="text-center">
                <Link
                  to="get-started-section"
                  smooth={true}
                  duration={500}
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-[50px] cursor-pointer hover:bg-blue-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div className="md:pt-0">
        <Features />
        <FunFacts />
      </div>

      {/* Get Started Section */}
      <div
        className="flex flex-col get-started-section justify-center items-center min-h-[80vh] bg-gradient-to-r from-blue-50 to-purple-50 pt-16 md:pt-0"
        id="get-started-section"
      >
        <h1 className="text-3xl md:text-4xl font-bold mt-8 md:mt-16 mb-6 md:mb-8 text-gray-800 px-4 text-center">
          Welcome to Skin Disease Detection
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-6xl px-4">
          <img
            src="img/bot.png"
            alt="doctor-image"
            className="w-40 md:w-56 doctor-image h-auto object-contain hidden md:block"
          />

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto justify-center">
            <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center w-full md:w-72">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-700">
                Patient
              </h2>
              <button
                onClick={() => navigate("/patient-login")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg mb-3 md:mb-4 w-full hover:from-blue-600 hover:to-blue-700 transition-all text-sm md:text-base"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/patient-signup")}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg w-full hover:from-green-600 hover:to-green-700 transition-all text-sm md:text-base"
              >
                Signup
              </button>
            </div>

            <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center w-full md:w-72">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-700">
                Doctor
              </h2>
              <button
                onClick={() => navigate("/doctor-login")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg mb-3 md:mb-4 w-full hover:from-blue-600 hover:to-blue-700 transition-all text-sm md:text-base"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/doctor-signup")}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg w-full hover:from-green-600 hover:to-green-700 transition-all text-sm md:text-base"
              >
                Signup
              </button>
            </div>
          </div>

          <img
            src="img/botcopy.png"
            alt="bot-image"
            className="w-40 md:w-56 h-auto bot-image object-contain hidden md:block"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-8 md:py-12 px-4 md:px-6 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Why is <span className="text-blue-600">AI Dermatologist</span> worth
          using?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 md:p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl md:text-5xl bg-blue-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <DiseaseDetection />

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4">About Us</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                We are a team of passionate developers and engineers dedicated to
                creating innovative AI-driven healthcare solutions that make a
                difference.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors text-base"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/patient-login"
                    className="text-gray-300 hover:text-white transition-colors text-base"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/team"
                    className="text-gray-300 hover:text-white transition-colors text-base"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/disease-details"
                    className="text-gray-300 hover:text-white transition-colors text-base"
                  >
                    Details
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Me */}
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-bold mb-4">Connect with Developer</h3>
              <div className="flex justify-center md:justify-end space-x-6">
                <a
                  href="https://github.com/SohamShinde160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/soham-s-shinde-16012004ss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href="https://sohamshinde.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  <FaGlobe className="text-2xl" />
                </a>
                <a
                  href="mailto:shindesoham390@gmail.com"
                  className="hover:text-gray-300"
                >
                  <FaEnvelope className="text-2xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="border-t border-gray-700 mt-10 pt-6 text-center">
            <p className="text-sm md:text-lg font-semibold text-gray-400">
              © 2025 AI-Dermatologist <br></br> Developed by Soham S Shinde 🗿
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-12 md:bottom-6 right-6 flex flex-col items-center z-50">
        {!showGame && (
          <>
            <div className="mb-2 bg-white text-black text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-md animate-bounce">
              Play Game!
            </div>
            <button
              onClick={() => setShowGame(true)}
              className="bg-blue-400 hover:bg-blue-500 rounded-full p-2 md:p-3 shadow-lg transition"
            >
              <img
                src="/img/memory.png"
                alt="Game Icon"
                className="w-10 h-10 scale-100 md:scale-150"
              />
            </button>
          </>
        )}
      </div>

      {showGame && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
          {gameWon && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={500}
            />
          )}
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Memory Map Game</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Moves: {moves}</span>
                <button
                  onClick={() => setShowGame(false)}
                  className="text-red-500 font-bold text-lg"
                >
                  X
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  className={`flex justify-center items-center rounded-md cursor-pointer 
                    h-16 md:h-20 text-2xl transition-all duration-200
                    ${matchedCards.includes(card.id) ? "bg-green-100" : "bg-blue-100"}
                    ${flippedCards.includes(index) ? "transform rotate-y-180" : ""}`}
                >
                  {flippedCards.includes(index) || matchedCards.includes(card.id)
                    ? card.emoji
                    : "❓"}
                </div>
              ))}
            </div>

            {gameWon && (
              <div className="text-center">
                <p className="text-lg font-bold text-green-600 mb-4">
                  Congratulations! You won in {moves} moves!
                </p>
                <button
                  onClick={restartGame}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;