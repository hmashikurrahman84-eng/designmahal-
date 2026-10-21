import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data folder and orders.json exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SEED_ORDERS = [
  {
    id: 'ORD-892104',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    clientName: 'তানভীর আহমেদ',
    contactMethod: 'whatsapp',
    contactValue: '+880 1712-345678',
    selectedService: 'প্রফেশনাল লোগো ডিজাইন',
    projectDetails: 'আমাদের নতুন ই-কমার্স ব্র্যান্ড "নক্ষত্র ফ্যাশন" এর জন্য একটি মিনিমালিস্ট ও লাক্সারি গোল্ডেন মনোগ্রাম লোগো প্রয়োজন। ভেক্টর সোর্স ফাইল (.AI, .EPS) সহ দ্রুত ডেলিভারি চাই।',
    preferredDeliveryDate: '২ দিনের মধ্যে',
    status: 'নতুন (New)',
    notes: 'ক্লায়েন্টের সাথে WhatsApp-এ প্রাথমিক কথা হয়েছে।',
  },
  {
    id: 'ORD-892095',
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    clientName: 'মো: হাসিবুর রহমান',
    contactMethod: 'whatsapp',
    contactValue: '+880 1823-456789',
    selectedService: 'সোশ্যাল মিডিয়া পোস্ট ডিজাইন',
    projectDetails: 'রমজান ও ঈদ ক্যাম্পেইনের জন্য মোট ১০টি ফেসবুক ও ইনস্টাগ্রাম ব্যানার ডিজাইন প্রয়োজন। সাইজ ১০৮০x১০৮০ পিক্সেল। ব্র্যান্ডের কালার কোড ও প্রোডাক্টের ছবি প্রদান করা হবে।',
    preferredDeliveryDate: '৪ দিনের মধ্যে',
    status: 'কাজ চলছে (In Progress)',
    notes: 'কনসেপ্ট ডিজাইন প্রস্তুত, ক্লায়েন্টকে পাঠানো হয়েছে।',
  }
];

if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(SEED_ORDERS, null, 2), 'utf-8');
} else {
  try {
    const existing = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8') || '[]');
    if (!Array.isArray(existing) || existing.length === 0) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(SEED_ORDERS, null, 2), 'utf-8');
    }
  } catch {}
}

// Helper to safely read orders
function readOrders(): any[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    const content = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading orders file:', err);
    return [];
  }
}

// Helper to safely write orders
function writeOrders(orders: any[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing orders file:', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));

  // --- API Endpoints for Orders Dashboard ---

  // GET all orders
  app.get('/api/orders', (_req, res) => {
    const orders = readOrders();
    res.json(orders);
  });

  // GET order statistics
  app.get('/api/orders/stats', (_req, res) => {
    const orders = readOrders();
    const stats = {
      total: orders.length,
      new: orders.filter((o) => o.status === 'নতুন (New)').length,
      inProgress: orders.filter((o) => o.status === 'কাজ চলছে (In Progress)').length,
      completed: orders.filter((o) => o.status === 'সম্পন্ন (Completed)').length,
      cancelled: orders.filter((o) => o.status === 'বাতিল (Cancelled)').length,
    };
    res.json(stats);
  });

  // POST create a new order (called whenever visitor places order on website)
  app.post('/api/orders', (req, res) => {
    const orderData = req.body;
    if (!orderData || !orderData.clientName) {
      return res.status(400).json({ error: 'Client name and details are required' });
    }

    const orders = readOrders();
    const newOrder = {
      ...orderData,
      id: orderData.id || `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: orderData.createdAt || new Date().toISOString(),
      status: orderData.status || 'নতুন (New)',
    };

    // Prepend new order to list so newest appears first
    const updated = [newOrder, ...orders.filter((o) => o.id !== newOrder.id)];
    writeOrders(updated);

    console.log(`[Order Received] ID: ${newOrder.id} by ${newOrder.clientName} for ${newOrder.selectedService}`);
    res.status(201).json(newOrder);
  });

  // PATCH update order status or notes
  app.patch('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const orders = readOrders();
    let updatedOrder = null;

    const updatedList = orders.map((ord) => {
      if (ord.id === id) {
        updatedOrder = {
          ...ord,
          ...(status ? { status } : {}),
          ...(notes !== undefined ? { notes } : {}),
        };
        return updatedOrder;
      }
      return ord;
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    writeOrders(updatedList);
    res.json(updatedOrder);
  });

  // DELETE an order
  app.delete('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const orders = readOrders();
    const updatedList = orders.filter((o) => o.id !== id);
    writeOrders(updatedList);
    res.json({ success: true, message: `Order ${id} deleted` });
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // --- Vite Dev Middleware or Static Production Serving ---
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Design Mahal Full-Stack Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
