const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-6 px-8 shadow-lg animate-gradient">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-extrabold tracking-wide text-center drop-shadow-md">
          Disaster Management & Relief Funds Portal
        </h1>
      </div>
      <style>
        {`
          @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient-animation 6s ease infinite;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
