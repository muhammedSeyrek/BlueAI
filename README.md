# 🛡️ BlueAI - Siber Güvenlik Asistanı

Modern ve hafif bir web arayüzü ile siber güvenlik danışmanlığı sunan AI asistanı.

## ✨ Özellikler

- **Hafif Mimari**: FastAPI + Jinja2 ile minimal bağımlılık
- **Modern UI**: Responsive tasarım ve smooth animasyonlar  
- **Dual Mode**: Genel sorular ve olay müdahale analizi
- **Offline AI**: Yerel GGUF model desteği
- **Fast Loading**: Lazy model loading ile hızlı başlangıç

## 📁 Dizin Yapısı

```
blueai-web/
├── main.py                 # FastAPI ana uygulaması
├── blueai_runner.py        # Model runner
├── requirements.txt        # Python bağımlılıkları
├── templates/
│   └── index.html         # Ana sayfa template
├── static/
│   ├── style.css         # CSS stilleri
│   └── script.js         # JavaScript fonksiyonları
└── models/
    └── senecallm_x_qwen2.5-7b-cybersecurity-q2_k.gguf
```

## 🚀 Kurulum

### 1. Repository'yi klonlayın
```bash
git clone <repo-url>
cd blueai-web
```

### 2. Sanal ortam oluşturun
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# veya
venv\Scripts\activate     # Windows
```

### 3. Bağımlılıkları yükleyin
```bash
pip install -r requirements.txt
```

### 4. Model dosyasını yerleştirin
Model dosyasını `models/` klasörüne kopyalayın:
```
models/senecallm_x_qwen2.5-7b-cybersecurity-q2_k.gguf
```

### 5. Uygulamayı başlatın
```bash
python main.py
```

Uygulama `http://localhost:8000` adresinde çalışacaktır.

## 🎯 Kullanım

### Genel Sorular
- Siber güvenlik konularında genel sorular sorabilirsiniz
- Teknik açıklamalar ve best practice'ler hakkında bilgi alabilirsiniz

### Olay Müdahale
- Şüpheli aktiviteleri analiz ettirebilirsiniz
- Log kayıtlarını inceleyebilirsiniz
- Güvenlik olayları için öneriler alabilirsiniz

## ⌨️ Klavye Kısayolları

- `Ctrl + Enter`: Formu gönder
- `Ctrl + 1`: Genel sorular sekmesi
- `Ctrl + 2`: Olay müdahale sekmesi

## 🔧 Özelleştirme

### Model Parametreleri
`blueai_runner.py` dosyasında model parametrelerini değiştirebilirsiniz:

```python
llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=2048,        # Context boyutu
    n_threads=8,       # Thread sayısı
    temperature=0.7,   # Yaratıcılık seviyesi
    top_p=0.9         # Nucleus sampling
)
```

### UI Teması
`static/style.css` dosyasından renk şemasını değiştirebilirsiniz:

```css
/* Ana gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Buton renkleri */
.submit-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
}
```

## 📊 Performans

- **Başlangıç**: ~2-3 saniye (model lazy loading)
- **Yanıt süresi**: ~3-10 saniye (model boyutuna bağlı)
- **Bellek kullanımı**: ~4-8GB (Q2_K quantization)
- **CPU kullanımı**: Orta-yüksek (inference sırasında)

## 🛠️ Geliştirme

### Production Deployment
```bash
# Gunicorn ile production server
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker Deployment
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit atın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🔗 Bağlantılar

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [llama-cpp-python](https://github.com/abetlen/llama-cpp-python)
- [Jinja2 Templates](https://jinja.palletsprojects.com/)