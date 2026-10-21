import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      return parsed;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Initialize clean empty files if they don't exist
if (!fs.existsSync(ORDERS_FILE)) {
  writeJsonFile(ORDERS_FILE, []);
}
if (!fs.existsSync(REVIEWS_FILE)) {
  writeJsonFile(REVIEWS_FILE, []);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));

  // --- ORDERS API ---
  app.get('/api/orders', (_req, res) => {
    const orders = readJsonFile<any[]>(ORDERS_FILE, []);
    res.json(orders);
  });

  app.post('/api/orders', (req, res) => {
    const orders = readJsonFile<any[]>(ORDERS_FILE, []);
    const body = req.body;
    const newOrder = {
      id: body.id || `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: body.createdAt || new Date().toISOString(),
      clientName: body.clientName || 'অজ্ঞাত ক্লায়েন্ট',
      contactMethod: body.contactMethod || 'whatsapp',
      contactValue: body.contactValue || '',
      selectedService: body.selectedService || 'গ্রাফিক ডিজাইন',
      projectDetails: body.projectDetails || '',
      preferredDeliveryDate: body.preferredDeliveryDate || 'আলোচনা সাপেক্ষে',
      referenceFiles: body.referenceFiles || [],
      referenceLinks: body.referenceLinks || '',
      status: body.status || 'নতুন (New)',
      notes: body.notes || '',
    };
    const updated = [newOrder, ...orders.filter((o) => o.id !== newOrder.id)];
    writeJsonFile(ORDERS_FILE, updated);
    res.status(201).json(newOrder);
  });

  app.patch('/api/orders/:id', (req, res) => {
    const orders = readJsonFile<any[]>(ORDERS_FILE, []);
    const { id } = req.params;
    const updates = req.body;
    const updated = orders.map((ord) => (ord.id === id ? { ...ord, ...updates } : ord));
    writeJsonFile(ORDERS_FILE, updated);
    res.json({ success: true });
  });

  app.delete('/api/orders/:id', (req, res) => {
    const orders = readJsonFile<any[]>(ORDERS_FILE, []);
    const { id } = req.params;
    const updated = orders.filter((ord) => ord.id !== id);
    writeJsonFile(ORDERS_FILE, updated);
    res.json({ success: true });
  });

  // --- REVIEWS API ---
  app.get('/api/reviews', (_req, res) => {
    const reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
    res.json(reviews);
  });

  app.post('/api/reviews', (req, res) => {
    const reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
    const body = req.body;
    const newReview = {
      id: body.id || `rev-${Date.now().toString().slice(-6)}`,
      clientName: body.clientName || 'ক্লায়েন্ট',
      companyOrRole: body.companyOrRole || '',
      serviceName: body.serviceName || 'গ্রাফিক ডিজাইন সার্ভিস',
      rating: Number(body.rating) || 5,
      comment: body.comment || '',
      avatarUrl: body.avatarUrl || '',
      createdAt: body.createdAt || new Date().toISOString(),
      verified: true,
      status: body.status || 'pending',
    };
    const updated = [newReview, ...reviews.filter((r) => r.id !== newReview.id)];
    writeJsonFile(REVIEWS_FILE, updated);
    res.status(201).json(newReview);
  });

  app.patch('/api/reviews/:id', (req, res) => {
    const reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
    const { id } = req.params;
    const updates = req.body;
    const updated = reviews.map((r) => (r.id === id ? { ...r, ...updates } : r));
    writeJsonFile(REVIEWS_FILE, updated);
    res.json({ success: true });
  });

  app.delete('/api/reviews/:id', (req, res) => {
    const reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
    const { id } = req.params;
    const updated = reviews.filter((r) => r.id !== id);
    writeJsonFile(REVIEWS_FILE, updated);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
