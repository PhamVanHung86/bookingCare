export const adminMenu = [
  {
    //hệ thống
    name: "menu.system.header",
    menus: [
      {
        name: "menu.system.system-administrator.header",
        subMenus: [
          {
            name: "menu.system.system-administrator.state.user.isLoggedIn",
            link: "/system/state.user.isLoggedIn",
          },
          {
            name: "menu.system.system-administrator.product-manage",
            link: "/system/product-manage",
          },
          {
            name: "menu.system.system-administrator.register-package-group-or-account",
            link: "/system/register-package-group-or-account",
          },
        ],
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
];
