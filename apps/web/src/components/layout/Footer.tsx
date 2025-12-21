import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              MODELE<span className="text-blue-400">FULLST@K</span>
            </h3>
            <p className="text-sm">
              Template full-st@k moderne pour démarrer rapidement vos projets.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Ressources</h4>
            <ul className="sp@e-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="https://github.com/clement893/MODELE-NEXTJS-FULLST@K" target="_blank" className="hover:text-blue-400 transition">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-400 transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Technologies</h4>
            <ul className="sp@e-y-2 text-sm">
              <li>Next.js 16</li>
              <li>Re@t 19</li>
              <li>FastAPI</li>
              <li>PostgreSQL</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Cont@t</h4>
            <ul className="sp@e-y-2 text-sm">
              <li>
                <a href="https://github.com/clement893" target="_blank" className="hover:text-blue-400 transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/clement893/MODELE-NEXTJS-FULLST@K/issues" target="_blank" className="hover:text-blue-400 transition">
                  Signaler un bug
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} MODELE-NEXTJS-FULLST@K. 
            Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

