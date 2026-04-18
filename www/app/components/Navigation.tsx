import { BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLng);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950 backdrop-blur-md border-b border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="assets/icons/icon48.png" alt="Wird Logo" className="w-10 h-10 rounded-xl shadow-lg" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">{t('nav.brand')}</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
            {t('nav.features')}
          </a>
          <a href="#screenshots" onClick={(e) => scrollToSection(e, 'screenshots')} className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
            {t('nav.screenshots')}
          </a>
          <a href="#download" onClick={(e) => scrollToSection(e, 'download')} className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
            {t('nav.download')}
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
          >
            {i18n.language === 'ar' ? 'EN' : 'AR'}
          </Button>
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2">
            <a href={t('common.chrome_url')} target="_blank" title={t('common.chrome')}>
              <Button variant="outline" className="border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-900 rounded-xl p-2 w-10 h-10 shadow-sm hover:shadow-red-500/20 transition-all active:scale-95 hover:bg-red-50 dark:hover:bg-red-950/30">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" 
                  alt="Chrome" 
                  className="w-5 h-5"
                />
              </Button>
            </a>
            <a href={t('common.firefox_url')} target="_blank" title={t('common.firefox')}>
              <Button variant="outline" className="border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-900 rounded-xl p-2 w-10 h-10 shadow-sm hover:shadow-orange-500/20 transition-all active:scale-95 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" 
                  alt="Firefox" 
                  className="w-5 h-5"
                />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
