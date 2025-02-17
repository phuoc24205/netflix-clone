const Footer = () => {
  return (
    <footer className="bg-black py-6 text-center text-white">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MovieStream. All rights reserved.
        </p>
        <nav className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
