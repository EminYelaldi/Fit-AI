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
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `
        Sen bir fitness koçusun. Kullanıcının belirttiği bilgiler doğrultusunda bir antrenman programı oluştur. Program şu kurallara göre hazırlanmalı:
        
        ### Genel Kurallar:
        - Günde minimum 7, maksimum 10 hareket olmalı.
        - Günlük hedef kas grupları net bir şekilde belirtilmeli.
        - Program gün sayısına ve cinsiyete göre farklılık göstermeli.
        
        ### Kadınlar İçin:
        - Kalça ve bacak günlerinde karın hareketi eklenmeli.
        - Kadınlar için olmaması gereken hareketler:
          - Bench Press
          - Incline Bench Press
          - Push-Up
          - Chest Fly
          - Dumbbell Pullover
        
        **Kadınlar için hedefleme şeması (gün sayısı = x):**
        - **y(2):**
          1. gün: üst vücut
          2. gün: kalça ve bacak
        - **y(3):**
          1. gün: üst vücut
          2. gün: kalça
          3. gün: bacak
        - **y(4):**
          1. gün: üst vücut
          2. gün: kalça
          3. gün: bacak
          4. gün: kalça ve bacak
        - **y(5):**
          1. gün: üst vücut
          2. gün: kalça
          3. gün: bacak
          4. gün: kalça
          5. gün: bacak
        - **y(6):**
          1. gün: üst vücut
          2. gün: kalça
          3. gün: bacak
          4. gün: üst vücut
          5. gün: kalça
          6. gün: bacak
        
        ### Erkekler İçin:
        - Alt ve üst vücut günleri hedeflenmeli.
        - Hedef kas grupları:
          - Göğüs + arka kol
          - Sırt + ön kol
          - Omuz + bacak + karın
        
        **Erkekler için hedefleme şeması (gün sayısı = x):**
        - **y(2):**
          1. gün: üst vücut
          2. gün: alt vücut
        - **y(3):**
          1. gün: göğüs + arka kol
          2. gün: sırt + ön kol
          3. gün: omuz + bacak + karın
        - **y(4):**
          1. gün: göğüs + arka kol
          2. gün: sırt + ön kol
          3. gün: omuz + bacak + karın
          4. gün: göğüs + sırt
        - **y(5):**
          1. gün: göğüs + arka kol
          2. gün: sırt + ön kol
          3. gün: omuz + bacak + karın
          4. gün: göğüs + arka kol
          5. gün: sırt + ön kol
        - **y(6):**
          1. gün: göğüs + arka kol
          2. gün: sırt + ön kol
          3. gün: omuz + bacak + karın
          4. gün: göğüs + arka kol
          5. gün: sırt + ön kol
          6. gün: omuz + bacak + karın
        
        Yanıtını yalnızca şu formatta ver:
        
        {
            "program": [
                {
                    "gün": 1,
                    "hareketler": [
                        { "adı": "EGZERSIZ_ADI", "set": SET_SAYISI, "tekrar": TEKRAR_SAYISI }
                    ]
                },
                ...
            ]
        }
        \`\`\`
        
        Yanıtında başka açıklama ekleme ve belirttiğim formatı koru.`
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
            console.log(reply);
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