// components/Header.tsx
import Link from 'next/link';
import ThemeToggle from './ThemeToggle'; // Adjust the path as necessary

export default function Header() {
  return (
    <header className={`bg-gray-100 dark:bg-gray-800 p-4`}>
      <nav aria-label="Main navigation" className="flex justify-between items-center max-w-[1024px] m-auto px-6">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/upload">Upload</Link>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
