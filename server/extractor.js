const pdf = require('pdf-parse')
const { createWorker } = require('tesseract.js')


async function extractText(buffer, mimetype, filename){
// Simple detection using mimetype and extension
const lower = (filename || '').toLowerCase()
try{
if (mimetype === 'application/pdf' || lower.endsWith('.pdf')){
const data = await pdf(buffer)
return (data.text || '').trim()
}


// image types
if (mimetype && mimetype.startsWith('image')){
const worker = createWorker()
await worker.load()
await worker.loadLanguage('eng')
await worker.initialize('eng')
const { data: { text } } = await worker.recognize(buffer)
await worker.terminate()
return (text || '').trim()
}


// fallback: treat as text
return buffer.toString('utf8')
} catch (err){
throw err
}
}


module.exports = { extractText }