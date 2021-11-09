export const navItems = [
// {
//   name: 'Budgeting',
//   url: '/budgeting',
//   icon: 'icon-notebook',
//   children: [
//     {
//       name: 'Create',
//       url: '/budgeting/create',
//       icon: ' '
//     },
//     {
//       name: 'List',
//       url: '/budgeting/list',
//       icon: ' '
//     },
//     {
//       name: 'Approve',
//       url: '/budgeting/list-approve',
//       icon: ' '
//     },
//     {
//       name: 'Input Kas',
//       url: '/budgeting/journal-create',
//       icon: ' '
//     },
//     {
//       name: 'History Kas',
//       url: '/budgeting/journal-list',
//       icon: ' '
//     },
//   ]
// },
{
  title: true,
  name: 'Cash In'
},
  {
    name: 'Sales Order',
    url: '/cash-in/summary',
    icon: 'icon-basket'
  },
  {
    name: 'Sales Invoice',
    url: '/cash-in/deposit-invoice',
    icon: 'icon-calculator'
  },
  {
    name: 'Receive Payment',
    url: '/cash-in/deposit-payment',
    icon: 'icon-briefcase'
  },
{
  title: true,
  name: 'Cash Out'
},
{
  name: 'Purchase Order',
  url: '/purchase-order',
  icon: 'icon-bag',
  children: [
    {
      name: 'Create',
      url: '/purchase-order/create',
      icon: ' '
    },
    {
      name: 'List',
      url: '/purchase-order/list',
      icon: ' '
    },
    {
      name: 'Approve',
      url: '/purchase-order/approve',
      icon: ' ',
      expectedRoles: [
        'Finance HQ',
        'Finance Branch',
        'administrator',
        'SysAdministrator',
      ]
    }
  ]
},
{
  name: 'Invoice',
  url: '/invoice',
  icon: 'icon-doc',
  children: [
    {
      name: 'Create',
      url: '/invoice/create',
      icon: ' '
    },
    {
      name: 'List',
      url: '/invoice/list',
      icon: ' '
    },
    {
      name: 'Approve',
      url: '/invoice/approve',
      icon: ' ',
      expectedRoles: [
        'Finance HQ',
        'Finance Branch',
        'administrator',
        'SysAdministrator',
      ]
    }
  ]
},
{
  name: 'Payment',
  url: '/payment',
  icon: 'icon-basket-loaded',
  expectedRoles: [
    'Finance HQ',
    'Finance Branch',
    'administrator',
    'SysAdministrator',
  ],
  children: [
    {
      name: 'Create',
      url: '/payment/create',
      icon: ' '
    },
    {
      name: 'History',
      url: '/payment/history',
      icon: ' '
    },
  ]
},
{
  divider: true
}
];
