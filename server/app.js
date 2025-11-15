const path = require('path')
const express = require('express')
const multer = require('multer')
const extractor = require('./extractor')
const analyzer = require('./analyzer')


const app = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 }})


app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))


// upload endpoint: accept file, return extracted text
app.post('/upload', upload.single('file'), async (req, res) => {
try{
if (!req.file) return res.json({ ok: false, error: 'No file uploaded' })
const buffer = req.file.buffer
const mimetype = req.file.mimetype
const originalname = req.file.originalname
const text = await extractor.extractText(buffer, mimetype, originalname)
res.json({ ok: true, text })
} catch (err) {
console.error('Extraction error', err)
res.json({ ok: false, error: String(err.message || err) })
}
})


// analyze endpoint: accept { text }
app.post('/analyze', (req, res) => {
try{
const { text } = req.body
if (!text) return res.status(400).json({ error: 'Missing text' })
const suggestions = analyzer.analyzeText(text)
res.json({ ok: true, suggestions })
} catch (err) {
console.error(err)
res.status(500).json({ error: String(err.message || err) })
}
})


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))