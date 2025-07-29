function showTab(tabName) {
    // Tüm tab içeriklerini gizle
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Tüm tab butonlarından active sınıfını kaldır
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Seçilen tab'ı göster
    document.getElementById(tabName + '-tab').style.display = 'block';
    
    // Seçilen tab butonunu aktif yap
    event.target.classList.add('active');
}

// Sayfa yüklendiğinde doğru tab'ı aktif yap
document.addEventListener('DOMContentLoaded', function() {
    // URL parametrelerini kontrol et veya form verilerini kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    const questionType = urlParams.get('question_type');
    
    // Eğer bir cevap varsa ve incident tipindeyse, incident tab'ını aç
    const hasAnswer = document.querySelector('.answer-section') !== null;
    const hasIncidentContent = document.querySelector('textarea[name="question"]').value.length > 0;
    
    if (hasAnswer && document.querySelector('input[name="question_type"][value="incident"]')) {
        showTabDirect('incident');
    } else if (hasAnswer && document.querySelector('input[name="question_type"][value="general"]')) {
        showTabDirect('general');
    }
});

function showTabDirect(tabName) {
    // Tüm tab içeriklerini gizle
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Tüm tab butonlarından active sınıfını kaldır
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Seçilen tab'ı göster
    document.getElementById(tabName + '-tab').style.display = 'block';
    
    // Seçilen tab butonunu aktif yap
    tabButtons.forEach(button => {
        if (button.onclick.toString().includes(tabName)) {
            button.classList.add('active');
        }
    });
}

// Form gönderildiğinde loading efekti
document.querySelectorAll('.question-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İşleniyor...';
        submitBtn.disabled = true;
        
        // Eğer bir hata olursa butonu eski haline getir
        setTimeout(() => {
            if (submitBtn.disabled) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 30000); // 30 saniye timeout
    });
});

// Textarea otomatik yükseklik ayarı
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});

// Klavye kısayolları
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter ile form gönder
    if (e.ctrlKey && e.key === 'Enter') {
        const activeTab = document.querySelector('.tab-content:not([style*="display: none"])');
        if (activeTab) {
            const form = activeTab.querySelector('form');
            if (form) {
                form.submit();
            }
        }
    }
    
    // Tab tuşları ile sekme değiştir (Ctrl+1, Ctrl+2)
    if (e.ctrlKey && e.key === '1') {
        e.preventDefault();
        showTabDirect('general');
    }
    if (e.ctrlKey && e.key === '2') {
        e.preventDefault();
        showTabDirect('incident');
    }
});