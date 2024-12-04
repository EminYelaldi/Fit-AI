require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const fs = require("fs");
const csv = require("csv-parser"); // CSV dosyası için

// Midllewares
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // Gerekirse belirli domainler eklenebilir.

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// API Endpoints
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send({ error: "Bir mesaj gerekli!" });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `Sen bir fitness koçusun. Gelen kullanıcı bilgilerine göre günlük antrenman programı oluştur. Antreman programı kullancının belirttiği gün kadar gün içermeli ve hareketleri dosyada sağlanan bilgilerden seç. Yanıtını şu formatta ver:
                    {
                        "program": [
                            {
                                "gün": 1,
                                "hareketler": [
                                    { "adı": "EGZERSIZ_ADI", "set": SET_SAYISI, "tekrar": TEKRAR_SAYISI }
                                ]
                            }
                        ]
                    }`
                },
                { role: "user", content: message }
            ]
        });

        const reply = response.choices[0].message.content;

        // JSON doğrulama
        try {
            const parsedReply = JSON.parse(reply);
            res.status(200).send({ reply: parsedReply });
        } catch (jsonError) {
            console.error("JSON Parse Error:", jsonError);
            res.status(500).send({ error: "Yanıt JSON formatında değil. Lütfen tekrar deneyin." });
        }
    } catch (error) {
        console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
        res.status(500).send({ error: error.response ? error.response.data : error.message });
    }
});

// Dosya işlemleri için örnek fonksiyon
const hareketler = [];

function loadCsv() {
    fs.createReadStream("GymHareketler.csv")
        .pipe(csv())
        .on("data", (row) => {
            hareketler.push(row);
        })
        .on("end", () => {
            console.log("Hareketler yüklendi:");
        });
}

// Sunucu başlatıldığında dosya yükleme
loadCsv();

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});