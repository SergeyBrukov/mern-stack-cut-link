import LoginPage from '../../pages/LoginPage';
import CreatePage from '../../pages/CreatePage';
import DetailPage from '../../pages/DetailPage';
import Home from '../../pages/Home';
import LinksPage from '../../pages/LinksPage';
import TestPAge from '../../pages/TestPAge';
import { IRouter } from '../../utils/interface';
import RegisterPage from '../../pages/RegisterPage';

// export const routers: IRouter[] = [
//   { path: '/', element: <Home /> },
//   { path: '/test', element: <TestPAge /> },
// ];

export const useRoutes = (isAuth: any): IRouter[] => {
  if (isAuth) {
    return [
      { path: '/', element: <Home /> },
      { path: '/links', element: <LinksPage /> },
      { path: '/create', element: <CreatePage /> },
      { path: '/detail/:id', element: <DetailPage /> },
      { path: '/test', element: <TestPAge /> },
    ];
  } else {
    return [
      { path: '/', element: <Home /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/test', element: <TestPAge /> },
    ];
  }
};
