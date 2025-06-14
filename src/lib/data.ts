import type { Product, Category } from './types';
import { Smartphone, Laptop, Headphones, Tv, Watch, Zap, ShieldCheck, Package, DollarSign, Users, Settings2, LogOut, HomeIcon, ShoppingBag, ListOrdered, CreditCard, Search, MapPin, Phone, Mail, LayoutGrid, BarChartBig, Printer } from 'lucide-react';

export const categoriesData: Category[] = [
  { id: '1', name: 'Smartphones', slug: 'smartphones', icon: Smartphone, image: { url: 'https://placehold.co/400x300.png', hint: 'smartphones category' } },
  { id: '2', name: 'Laptops', slug: 'laptops', icon: Laptop, image: { url: 'https://placehold.co/400x300.png', hint: 'laptops category' } },
  { id: '3', name: 'Audio', slug: 'audio', icon: Headphones, image: { url: 'https://placehold.co/400x300.png', hint: 'audio devices' } },
  { id: '4', name: 'TVs & Displays', slug: 'tvs-displays', icon: Tv, image: { url: 'https://placehold.co/400x300.png', hint: 'tv displays' } },
  { id: '5', name: 'Wearables', slug: 'wearables', icon: Watch, image: { url: 'https://placehold.co/400x300.png', hint: 'wearable tech' } },
  { id: '6', name: 'Accessories', slug: 'accessories', icon: Zap, image: { url: 'https://placehold.co/400x300.png', hint: 'tech accessories' } },
];

export const productsData: Product[] = [
  {
    id: '1',
    name: '旗舰智能手机 X100',
    description: '最新的旗舰智能手机，具有尖端功能和令人惊叹的显示屏。体验无与伦比的性能和摄影效果。',
    price: 999.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'smartphone modern' },
      { url: 'https://placehold.co/600x600.png', hint: 'smartphone angle' },
      { url: 'https://placehold.co/600x600.png', hint: 'smartphone camera' }
    ],
    category: 'Smartphones',
    stock: 50,
    specifications: { 'Screen': '6.7" OLED 120Hz', 'RAM': '12GB', 'Storage': '256GB UFS 4.0', 'Camera': '108MP Main, 12MP Ultrawide, 10MP Telephoto' },
    featured: true,
  },
  {
    id: '2',
    name: '超薄笔记本电脑 ProMax',
    description: '强大而便携的笔记本电脑，适合专业人士和创意人士。轻巧设计，性能不打折。',
    price: 1499.00,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'laptop sleek' },
      { url: 'https://placehold.co/600x600.png', hint: 'laptop keyboard' }
    ],
    category: 'Laptops',
    stock: 30,
    specifications: { 'CPU': 'Intel Core i7 13th Gen', 'RAM': '16GB DDR5', 'Storage': '512GB NVMe SSD', 'Display': '14" QHD+ IPS' },
    featured: true,
  },
  {
    id: '3',
    name: '降噪耳机 Elite Sound',
    description: '沉浸式音质，具有主动降噪功能。享受纯净音乐，不受干扰。',
    price: 249.50,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'headphones audio' },
      { url: 'https://placehold.co/600x600.png', hint: 'headphones lifestyle' }
    ],
    category: 'Audio',
    stock: 100,
    specifications: { 'Type': 'Over-ear', 'Connectivity': 'Bluetooth 5.3, ANC', 'Battery Life': '30 hours (ANC on)' },
  },
  {
    id: '4',
    name: '智能电视 4K Ultra Vision',
    description: '令人惊叹的 4K 超高清画质，内置智能功能。将影院体验带回家。',
    price: 799.00,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'smart-tv display' },
      { url: 'https://placehold.co/600x600.png', hint: 'tv livingroom' }
    ],
    category: 'TVs & Displays',
    stock: 20,
    specifications: { 'Size': '55 inch QLED', 'Resolution': '4K UHD HDR10+', 'Smart Features': 'Google TV, Dolby Atmos' },
    featured: true,
  },
  {
    id: '5',
    name: '健身追踪智能手表 FitGo Pro',
    description: '通过先进的健康和健身追踪功能，保持活跃和连接。您的私人健康助手。',
    price: 199.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'smartwatch wearable' },
      { url: 'https://placehold.co/600x600.png', hint: 'smartwatch fitness' }
    ],
    category: 'Wearables',
    stock: 75,
    specifications: { 'Display': '1.4" AMOLED', 'Sensors': 'Heart Rate, SpO2, GPS', 'Water Resistance': '5ATM' },
  },
  {
    id: '6',
    name: '游戏主机 NextDimension',
    description: '体验具有闪电般快速加载时间和令人惊叹的图形的新一代游戏。开启您的游戏冒险。',
    price: 499.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'gaming console' },
      { url: 'https://placehold.co/600x600.png', hint: 'console controller' }
    ],
    category: 'Accessories', // Assuming Gaming is a sub-type of Accessories for simplicity
    stock: 40,
    specifications: { 'Storage': '1TB NVMe SSD', 'Resolution': 'Up to 8K', 'Controller': 'Haptic Feedback, Adaptive Triggers' },
    featured: true,
  },
  {
    id: '7',
    name: '无线充电板 Qi PowerUp',
    description: '为您的兼容设备提供方便快捷的无线充电。告别线缆束缚。',
    price: 39.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'wireless charger' }
    ],
    category: 'Accessories',
    stock: 150,
    specifications: { 'Output': '15W Max Fast Charge', 'Compatibility': 'Qi-enabled devices' },
  },
  {
    id: '8',
    name: '便携式蓝牙音箱 BlastWave',
    description: '小巧但功能强大的蓝牙音箱，适合旅途中使用。随时随地享受音乐。',
    price: 79.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'bluetooth speaker' }
    ],
    category: 'Audio',
    stock: 80,
    specifications: { 'Battery Life': '12 hours', 'Water Resistance': 'IPX7', 'Connectivity': 'Bluetooth 5.0, Aux-in' },
  },
];

export const getProductById = (id: string): Product | undefined => productsData.find(p => p.id === id);
export const getProductsByCategory = (slug: string): Product[] => {
  const category = categoriesData.find(c => c.slug === slug);
  if (!category) return [];
  return productsData.filter(p => p.category === category.name);
};
export const getFeaturedProducts = (): Product[] => productsData.filter(p => p.featured);

// Navigation items
import type { NavItem } from './types';
export const mainNavItems: NavItem[] = [
  { href: '/', label: '首页', icon: HomeIcon },
  { href: '/products', label: '所有产品', icon: LayoutGrid },
  // Categories can be dynamically added or listed here
];

export const userNavItems: NavItem[] = [
  { href: '/cart', label: '购物车', icon: ShoppingBag },
  { href: '/account', label: '我的账户', icon: Users, authRequired: true },
  { href: '/account/orders', label: '我的订单', icon: ListOrdered, authRequired: true },
];

export const adminNavItems: NavItem[] = [
  { href: '/admin', label: '仪表盘', icon: Settings2, adminOnly: true },
  { href: '/admin/products', label: '产品管理', icon: Package, adminOnly: true },
  { href: '/admin/orders', label: '订单管理', icon: ListOrdered, adminOnly: true },
  { href: '/admin/analytics', label: '销售分析', icon: BarChartBig, adminOnly: true },
  { href: '/pos', label: 'POS 系统', icon: Printer, adminOnly: true },
];
