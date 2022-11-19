type TNavBarRouters = {
  to: string;
  name: string;
};

export const handleAuthnavBarRouters = (isAuthenticated: boolean) => {
  console.log('Rerender');

  if (isAuthenticated) {
    const routersNavbarTNavBarRouters: TNavBarRouters[] = [
      { to: '/create', name: 'Create' },
      { to: '/links', name: 'Links' },
    ];
    return routersNavbarTNavBarRouters;
  }
  if (!isAuthenticated) {
    const routersNavbarTNavBarRouters: TNavBarRouters[] = [
      { to: '/login', name: 'Login' },
      { to: '/register', name: 'Register' },
    ];
    return routersNavbarTNavBarRouters;
  }
};
