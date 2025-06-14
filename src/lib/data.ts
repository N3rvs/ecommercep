import type { Product, Category } from './types';
import { Smartphone, Laptop, Headphones, Tv, Watch, Zap, ShieldCheck, Package, DollarSign, Users, Settings2, LogOut, HomeIcon, ShoppingBag, ListOrdered, CreditCard, Search, MapPin, Phone, Mail, LayoutGrid, BarChartBig, Printer } from 'lucide-react';

export const categoriesData: Category[] = [
  { id: '1', name: 'Smartphones', slug: 'smartphones', icon: Smartphone, image: { url: 'https://placehold.co/400x300.png', hint: 'smartphones category' } },
  { id: '2', name: 'Laptops', slug: 'laptops', icon: Laptop, image: { url: 'https://placehold.co/400x300.png', hint: 'laptops category' } },
  { id: '3', name: 'Audio', slug: 'audio', icon: Headphones, image: { url: 'https://placehold.co/400x300.png', hint: 'audio devices' } },
  { id: '4', name: 'TVs y Pantallas', slug: 'tvs-displays', icon: Tv, image: { url: 'https://placehold.co/400x300.png', hint: 'tv displays' } }, // Changed "TVs & Displays"
  { id: '5', name: 'Wearables', slug: 'wearables', icon: Watch, image: { url: 'https://placehold.co/400x300.png', hint: 'wearable tech' } },
  { id: '6', name: 'Accesorios', slug: 'accessories', icon: Zap, image: { url: 'https://placehold.co/400x300.png', hint: 'tech accessories' } },
];

export const productsData: Product[] = [
  {
    id: '1',
    name: 'Smartphone Emblemático X100', // Changed from 旗舰智能手机 X100
    description: 'El último smartphone emblemático con características de vanguardia y una pantalla impresionante. Experimenta un rendimiento y fotografía incomparables.', // Changed description
    price: 999.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'smartphone modern' },
      { url: 'https://placehold.co/600x600.png', hint: 'smartphone angle' },
      { url: 'https://placehold.co/600x600.png', hint: 'smartphone camera' }
    ],
    category: 'Smartphones',
    stock: 50,
    specifications: { 'Pantalla': '6.7" OLED 120Hz', 'RAM': '12GB', 'Almacenamiento': '256GB UFS 4.0', 'Cámara': '108MP Principal, 12MP Ultra Gran Angular, 10MP Teleobjetivo' }, // Changed specifications keys
    featured: true,
  },
  {
    id: '2',
    name: 'Laptop Ultradelgada ProMax', // Changed from 超薄笔记本电脑 ProMax
    description: 'Una laptop potente y portátil para profesionales y creativos. Diseño ligero sin comprometer el rendimiento.', // Changed description
    price: 1499.00,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'laptop sleek' },
      { url: 'https://placehold.co/600x600.png', hint: 'laptop keyboard' }
    ],
    category: 'Laptops',
    stock: 30,
    specifications: { 'CPU': 'Intel Core i7 13ª Gen', 'RAM': '16GB DDR5', 'Almacenamiento': '512GB NVMe SSD', 'Pantalla': '14" QHD+ IPS' }, // Changed specifications keys
    featured: true,
  },
  {
    id: '3',
    name: 'Auriculares con Cancelación de Ruido Elite Sound', // Changed from 降噪耳机 Elite Sound
    description: 'Calidad de sonido inmersiva con cancelación activa de ruido. Disfruta de tu música sin distracciones.', // Changed description
    price: 249.50,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'headphones audio' },
      { url: 'https://placehold.co/600x600.png', hint: 'headphones lifestyle' }
    ],
    category: 'Audio',
    stock: 100,
    specifications: { 'Tipo': 'Over-ear', 'Conectividad': 'Bluetooth 5.3, ANC', 'Duración Batería': '30 horas (ANC activado)' }, // Changed specifications keys
  },
  {
    id: '4',
    name: 'Smart TV 4K Ultra Vision', // Changed from 智能电视 4K Ultra Vision
    description: 'Impresionante calidad de imagen 4K Ultra HD con funciones inteligentes integradas. Lleva el cine a casa.', // Changed description
    price: 799.00,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'smart-tv display' },
      { url: 'https://placehold.co/600x600.png', hint: 'tv livingroom' }
    ],
    category: 'TVs y Pantallas', // Changed category name
    stock: 20,
    specifications: { 'Tamaño': '55 pulgadas QLED', 'Resolución': '4K UHD HDR10+', 'Funciones Smart': 'Google TV, Dolby Atmos' }, // Changed specifications keys
    featured: true,
  },
  {
    id: '5',
    name: 'Smartwatch de Seguimiento Fitness FitGo Pro', // Changed from 健身追踪智能手表 FitGo Pro
    description: 'Mantente activo y conectado con funciones avanzadas de seguimiento de salud y fitness. Tu asistente personal de bienestar.', // Changed description
    price: 199.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'smartwatch wearable' },
      { url: 'https://placehold.co/600x600.png', hint: 'smartwatch fitness' }
    ],
    category: 'Wearables',
    stock: 75,
    specifications: { 'Pantalla': '1.4" AMOLED', 'Sensores': 'Ritmo Cardíaco, SpO2, GPS', 'Resistencia al Agua': '5ATM' }, // Changed specifications keys
  },
  {
    id: '6',
    name: 'Consola de Videojuegos NextDimension', // Changed from 游戏主机 NextDimension
    description: 'Experimenta la nueva generación de videojuegos con cargas ultrarrápidas y gráficos impresionantes. Comienza tu aventura de juego.', // Changed description
    price: 499.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'gaming console' },
      { url: 'https://placehold.co/600x600.png', hint: 'console controller' }
    ],
    category: 'Accesorios', // Assuming Gaming is a sub-type of Accessories for simplicity
    stock: 40,
    specifications: { 'Almacenamiento': '1TB NVMe SSD', 'Resolución': 'Hasta 8K', 'Controlador': 'Retroalimentación Háptica, Gatillos Adaptativos' }, // Changed specifications keys
    featured: true,
  },
  {
    id: '7',
    name: 'Cargador Inalámbrico Qi PowerUp', // Changed from 无线充电板 Qi PowerUp
    description: 'Carga inalámbrica cómoda y rápida para tus dispositivos compatibles. Di adiós a los cables.', // Changed description
    price: 39.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'wireless charger' }
    ],
    category: 'Accesorios',
    stock: 150,
    specifications: { 'Salida': 'Carga Rápida 15W Max', 'Compatibilidad': 'Dispositivos compatibles con Qi' }, // Changed specifications keys
  },
  {
    id: '8',
    name: 'Altavoz Bluetooth Portátil BlastWave', // Changed from 便携式蓝牙音箱 BlastWave
    description: 'Altavoz Bluetooth compacto pero potente para llevar a todas partes. Disfruta de tu música donde sea.', // Changed description
    price: 79.99,
    images: [
      { url: 'https://placehold.co/600x600.png', hint: 'bluetooth speaker' }
    ],
    category: 'Audio',
    stock: 80,
    specifications: { 'Duración Batería': '12 horas', 'Resistencia al Agua': 'IPX7', 'Conectividad': 'Bluetooth 5.0, Aux-in' }, // Changed specifications keys
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
  { href: '/', label: 'Inicio', icon: HomeIcon },
  { href: '/products', label: 'Todos los Productos', icon: LayoutGrid },
  // Categories can be dynamically added or listed here
];

export const userNavItems: NavItem[] = [
  { href: '/cart', label: 'Carrito', icon: ShoppingBag },
  { href: '/account', label: 'Mi Cuenta', icon: Users, authRequired: true },
  { href: '/account/orders', label: 'Mis Pedidos', icon: ListOrdered, authRequired: true },
];

export const adminNavItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: Settings2, adminOnly: true },
  { href: '/admin/products', label: 'Productos', icon: Package, adminOnly: true },
  { href: '/admin/orders', label: 'Pedidos', icon: ListOrdered, adminOnly: true },
  { href: '/admin/analytics', label: 'Análisis', icon: BarChartBig, adminOnly: true },
  { href: '/pos', label: 'Sistema POS', icon: Printer, adminOnly: true },
];
