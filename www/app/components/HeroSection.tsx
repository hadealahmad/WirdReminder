import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t, i18n } = useTranslation()

  return (
    <section className='relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-b from-emerald-50/30 to-white dark:bg-gray-950 dark:bg-none'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5 pointer-events-none'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1724488258906-ce80713e28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwZ2VvbWV0cmljJTIwcGF0dGVybiUyMG1vZGVybnxlbnwxfHx8fDE3NzEyNTUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: i18n.language === 'ar' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-center lg:text-start'
          >
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 rounded-full mb-6'>
              <span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></span>
              <span className='text-sm text-emerald-700 dark:text-white font-medium'>
                {t('hero.badge')}
              </span>
            </div>

            <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
              {t('hero.title_pre')}{' '}
              <span className='text-emerald-600 relative'>
                {t('hero.title_highlight')}
                <svg
                  className='absolute -bottom-2 right-0 w-full'
                  height='8'
                  viewBox='0 0 200 8'
                  fill='none'
                >
                  <path
                    d='M0 4C50 2 150 6 200 4'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-emerald-300'
                  />
                </svg>
              </span>
            </h1>

            <p className='text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0'>
              {t('hero.description')}
            </p>

            <div className='flex flex-col gap-6 items-center lg:items-start relative z-20'>
              <div className='flex flex-wrap gap-4 justify-center lg:justify-start w-full'>
                <a
                  href={t('common.chrome_url')}
                  target='_blank'
                  className='w-full sm:w-auto relative z-30'
                >
                  <Button
                    variant='outline'
                    className='border-2 border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-900 rounded-2xl px-6 py-8 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all dark:text-white w-full flex items-center gap-4 shadow-lg hover:shadow-red-500/20'
                  >
                    <img
                      src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg'
                      alt='Chrome'
                      className='w-8 h-8'
                    />
                    <div className='text-start'>
                      <div className='text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5'>
                        {t('download.safe_desc')}
                      </div>
                      <div className='text-lg font-bold text-gray-900 dark:text-white leading-tight'>
                        {t('common.chrome')}
                      </div>
                    </div>
                  </Button>
                </a>
                <a
                  href={t('common.firefox_url')}
                  target='_blank'
                  className='w-full sm:w-auto relative z-30'
                >
                  <Button
                    variant='outline'
                    className='border-2 border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-900 rounded-2xl px-6 py-8 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all dark:text-white w-full flex items-center gap-4 shadow-lg hover:shadow-orange-500/20'
                  >
                    <img
                      src='https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg'
                      alt='Firefox'
                      className='w-8 h-8'
                    />
                    <div className='text-start'>
                      <div className='text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5'>
                        {t('download.safe_desc')}
                      </div>
                      <div className='text-lg font-bold text-gray-900 dark:text-white leading-tight'>
                        {t('common.firefox')}
                      </div>
                    </div>
                  </Button>
                </a>
              </div>
            </div>

            <div className='mt-10 flex items-center gap-8 text-sm text-gray-500 justify-center lg:justify-start'>
              <div className='flex items-center gap-2 font-medium'>
                <svg
                  className='w-5 h-5 text-emerald-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                {t('hero.feature_free')}
              </div>
              <div className='flex items-center gap-2 font-medium'>
                <svg
                  className='w-5 h-5 text-emerald-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                {t('hero.feature_no_ads')}
              </div>
              <div className='flex items-center gap-2 font-medium'>
                <svg
                  className='w-5 h-5 text-emerald-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                {t('hero.feature_open_source')}
              </div>
            </div>
          </motion.div>

          {/* Left Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='relative'
          >
            <div className='relative z-10' dir='ltr'>
              {/* Browser Window Frame with Glow */}
              <div className='relative mx-auto w-full lg:max-w-2xl'>
                <div className='absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl blur-3xl opacity-20 scale-95'></div>
                <div className='relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5'>
                  {/* Browser Header */}
                  <div className='bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-md px-4 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-6'>
                    <div className='flex gap-2'>
                      <div className='w-3 h-3 rounded-full bg-red-400/80 shadow-sm shadow-red-500/10'></div>
                      <div className='w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm shadow-yellow-500/10'></div>
                      <div className='w-3 h-3 rounded-full bg-green-400/80 shadow-sm shadow-green-500/10'></div>
                    </div>
                    <div className='flex-1 max-w-md bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-1.5 flex items-center gap-3'>
                      <div className='w-4 h-4 text-emerald-500'>
                        <svg fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z' />
                        </svg>
                      </div>
                      <span className='text-[11px] text-gray-400 font-mono tracking-wider overflow-hidden text-ellipsis whitespace-nowrap'>
                        chrome-extension://pgogfohfgohkfpfifdojhmladlaeceok/index.html
                      </span>
                    </div>
                  </div>
                  {/* Browser Content / Extension View */}
                  <div className='relative bg-white dark:bg-gray-950 overflow-hidden group'>
                    <ImageWithFallback
                      src='assets/screenshots/reader.png'
                      alt='Quran Reader Interface'
                      className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]'
                    />
                    {/* Glass Overlay on Image */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none'></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute top-10 -end-4 z-10 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-800'
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-emerald-600 dark:text-emerald-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
                  </svg>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900 dark:text-white'>
                    {t('hero.reminder_title')}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {t('hero.reminder_text')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
