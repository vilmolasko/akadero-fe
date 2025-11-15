'use client';
import { Suspense } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import BProgressProvider from '@/providers/bprogress-provider';
import { Toaster } from 'react-hot-toast';
// redux
import { Provider } from 'react-redux';
import { reduxStore, persistor } from '@/redux';
//

import { PersistGate } from 'redux-persist/integration/react';
import Image from 'next/image';

export default function Providers({ children }) {
  return (
    <Suspense fallback={null}>
      <Provider store={reduxStore}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <QueryProvider>
            <BProgressProvider>
              <Toaster
                position='top-center'
                reverseOrder={false}
              />
              <PersistGate
                loading={
                  <div
                    style={{
                      position: 'fixed',
                      top: '50%',
                      width: '100px',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                      zIndex: 11,
                    }}>
                    <Image
                      src='/logo-dark.png'
                      alt='Logo'
                      placeholder='blur'
                      blurDataURL='/logo-dark.png'
                      className='object-contain'
                      width={190}
                      height={52}
                    />
                  </div>
                }
                persistor={persistor}>
                {children}
              </PersistGate>
            </BProgressProvider>
          </QueryProvider>
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
}
