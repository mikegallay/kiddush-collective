export default function Footer() {
    return (
      <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} The Kiddush Project. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex justify-center space-x-4">
            <li>
              <a
                href="/privacy"
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
  