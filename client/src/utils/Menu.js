import { FaHome, FaList, FaChartBar, FaMoneyBillAlt } from 'react-icons/fa';

export const MenuItems = [
  {
    id: 1,
    title: 'Dashboard',
    icon: FaHome,
    link: '/',
  },
  {
    id: 2,
    title: 'View Transactions',
    icon: FaList,
    link: '/transactions',
  },
  {
    id: 3,
    title: 'Earnings',
    icon: FaChartBar,
    link: '/earnings',
  },
  {
    id: 4,
    title: 'Spendings',
    icon: FaMoneyBillAlt,
    link: '/spendings',
  },
];
