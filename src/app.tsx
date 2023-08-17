import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

import { useConnectXrpl } from './api/xrpl/connect-xrpl';

const MainPage = lazy(() => import('./pages/main'));
const TradePage = lazy(() => import('./pages/detail/trade-page'));
const MyPage = lazy(() => import('./pages/me'));
const AppProvider = lazy(() => import('~/hocs/hoc-app-provider'));

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  useConnectXrpl();

  return (
    <BrowserRouter>
      <Suspense>
        <AppProvider>
          <RouteWrapper>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/trade" element={<TradePage />} />
              <Route path="/me" element={<MyPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </RouteWrapper>
        </AppProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
