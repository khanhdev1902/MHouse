const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const { connectDB } = require('./config/database')
const userRoutes = require('./routes/user.route')
const roomRoutes = require('./routes/room.route')
const serviceRoutes = require('./routes/service.route')
const amenityRoutes = require('./routes/amenity.route')
const invoiceRoutes = require('./routes/invoice.route')
const paymentRoute = require('./routes/payment.route')
const chatRoute = require('./routes/chat.route')
const contractRoute = require('./routes/contract.route')
const invoiceDetailRoute = require('./routes/invoiceDetail.route')
const dashboardRoute = require('./routes/dashboard.route')
const ChatService = require('./services/chat.service')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/amenities', amenityRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/payments', paymentRoute)
app.use('/api/chats', chatRoute)
app.use('/api/contracts', contractRoute)
app.use('/api/invoice-details', invoiceDetailRoute)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/', require('./zalopay/index'))

app.get('/', (req, res) => {
  res.send('MHouse API running')
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', // hoặc chỉ định domain frontend
    methods: ['GET', 'POST'],
  },
})

// Socket.IO realtime
io.on('connection', (socket) => {
  console.log('⚡ New client connected', socket.id)

  socket.on('send_message', (data) => {
    // Khi có message mới: emit realtime cho tất cả client
    io.emit('receive_message', data)
  })


  socket.on('disconnect', () => {
    console.log('❌ Client disconnected', socket.id)
  })
})

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
})
