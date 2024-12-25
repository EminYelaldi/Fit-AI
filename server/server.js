require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const fs = require("fs");
const csv = require("csv-parser");
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Firebase Admin SDK'yı başlat
const serviceAccount = JSON.parse(fs.readFileSync('./firebasekey.json', 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fitness-62a19.firebaseio.com', // Firebase projesine uygun URL
});
const db = admin.firestore();

// Midllewares
const app = express();
app.use(express.json());
app.use(bodyParser.json());
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
// 1. Kullanıcı ekleme endpointi
app.post('/add-user', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Name, email, and age are required' });
    }

    // Firestore'a veri ekleme
    const docRef = await db.collection('Users').add({ email, password });
    res.status(200).json({ message: 'User added successfully', docId: docRef.id });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
});

// 2. Kullanıcıları listeleme endpointi
app.get('/get-users', async (req, res) => {
  try {
    const snapshot = await db.collection('Users').get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

//ID ile 1 Kullanıcı getir
app.get('/get-user', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email gereklidir.' });
    }

    const snapshot = await db.collection('Users').where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const user = snapshot.docs[0].data();
    res.status(200).json({ id: snapshot.docs[0].id, ...user });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı alınırken bir hata oluştu.', error: error.message });
  }
});
app.post('/save-program', async (req, res) => {
  try {
    const { userId, program } = req.body;

    if (!userId || !program) {
      return res.status(400).json({ message: 'Kullanıcı ID ve program verisi gereklidir' });
    }

    // Kullanıcının programını kaydet veya güncelle
    const userRef = db.collection('Users').doc(userId);
    await userRef.update({ program });

    res.status(200).json({ message: 'Program başarıyla kaydedildi' });
  } catch (error) {
    console.error('Program Kaydetme Hatası:', error);
    res.status(500).json({ message: 'Program kaydedilirken bir hata oluştu', error: error.message });
  }
});

//Kullanıcının Programını getirme
app.get('/get-program/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await db.collection('Users').doc(id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'Program bulunamadi' });

    }

    res.status(200).json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// 3. Kullanıcı silme endpointi
app.delete('/delete-user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('Users').doc(id).delete();
    res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// 4. Kullanıcı güncelleme endpointi
app.put('/update-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, program } = req.body;

    if (!email && !password && !program) {
      return res.status(400).json({ message: 'At least one field (name, email, age) is required' });
    }

    await db.collection('Users').doc(id).update({ email, password, program });
    res.status(200).json({ message: `User with ID ${id} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
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