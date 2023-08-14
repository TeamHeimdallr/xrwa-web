import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

const MainPage = lazy(() => import('./pages/main'));
const AppProvider = lazy(() => import('~/hocs/hoc-app-provider'));

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <AppProvider>
          <RouteWrapper>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </RouteWrapper>
        </AppProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
