const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// POST /api/auth/login
server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } else {
    res.status(401).json({ message: 'Correo o contraseña incorrectos' });
  }
});

// GET /api/accounts/me  →  cuentas del usuario 1
server.get('/api/accounts/me', (req, res) => {
  const accounts = router.db.get('accounts').filter({ userId: '1' }).value();
  res.json(accounts);
});

// GET /api/accounts/search?q=...
server.get('/api/accounts/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const results = router.db
    .get('accounts')
    .filter(a =>
      a.accountNumber.includes(q) ||
      a.ownerName.toLowerCase().includes(q)
    )
    .value();
  res.json(results);
});

// GET /api/transfers/history
server.get('/api/transfers/history', (req, res) => {
  const { fromDate, toDate, page = 1, limit = 10 } = req.query;
  let transfers = router.db.get('transfers').value();

  if (fromDate) {
    transfers = transfers.filter(t => new Date(t.date) >= new Date(fromDate));
  }
  if (toDate) {
    transfers = transfers.filter(t => new Date(t.date) <= new Date(toDate));
  }

  const start = (Number(page) - 1) * Number(limit);
  res.json(transfers.slice(start, start + Number(limit)));
});

// POST /api/transfers
server.post('/api/transfers', (req, res) => {
  const { fromAccountId, toAccountNumber, amount, concept } = req.body;

  const fromAccount = router.db.get('accounts').find({ id: fromAccountId }).value();
  if (!fromAccount) {
    return res.status(404).json({ message: 'Cuenta origen no encontrada' });
  }
  if (fromAccount.balance < amount) {
    return res.status(400).json({ message: 'Saldo insuficiente' });
  }

  // Descontar saldo
  router.db
    .get('accounts')
    .find({ id: fromAccountId })
    .assign({ balance: fromAccount.balance - amount })
    .write();

  const newTransfer = {
    id: String(Date.now()),
    fromAccount: fromAccount.accountNumber,
    toAccount: toAccountNumber,
    amount: Number(amount),
    concept,
    date: new Date().toISOString(),
    status: 'SUCCESS',
    folio: `TRF-${String(Date.now()).slice(-5)}`,
  };

  router.db.get('transfers').push(newTransfer).write();
  res.status(201).json(newTransfer);
});

server.use('/api', router);

server.listen(3000, () => {
  console.log('JSON Server corriendo en http://localhost:3000');
  console.log('Endpoints disponibles:');
  console.log('  POST /api/auth/login');
  console.log('  GET  /api/accounts/me');
  console.log('  GET  /api/accounts/search?q=...');
  console.log('  GET  /api/transfers/history');
  console.log('  POST /api/transfers');
});
