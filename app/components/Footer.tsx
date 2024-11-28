import { getScopedI18n } from "@/locales/server";

export default async function Footer() {

    const t = await getScopedI18n('footer');

    return (
      <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
       
        <nav aria-label="Footer navigation">
          <ul className="flex justify-center gap-6">
            <li>
              <a
                href="/privacy-policy"
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
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {t('copyright')}
        </p>
      </footer>
    );
  }
  