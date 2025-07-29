from llama_cpp import Llama
import os

MODEL_PATH = "models/senecallm_x_qwen2.5-7b-cybersecurity-q2_k.gguf"

# Global model instance (lazy loading)
_llm = None

def get_model():
    """Model instance'ını lazy loading ile döndür"""
    global _llm
    if _llm is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model dosyası bulunamadı: {MODEL_PATH}")
        
        print("Model yükleniyor, lütfen bekleyin...")
        _llm = Llama(
            model_path=MODEL_PATH,
            n_ctx=2048,
            n_threads=8,
            verbose=False
        )
        print("Model başarıyla yüklendi!")
    return _llm

def get_answer(prompt: str, max_tokens=512):
    """
    Verilen prompt için model yanıtı üret
    """
    try:
        llm = get_model()
        
        # Siber güvenlik context'i ekle
        cybersec_prompt = f"""Aşağıda bir kullanıcıdan gelen siber güvenlikle ilgili bir soru var. Lütfen bir siber güvenlik uzmanı gibi, teknik ve Türkçe olarak doğru, net ve detaylı bir yanıt ver.

Soru: {prompt}

Yanıt:"""
        
        response = llm(
            cybersec_prompt, 
            max_tokens=max_tokens, 
            stop=["</s>", "Soru:", "\n\nSoru:", "Human:", "Assistant:"],
            temperature=0.7,
            top_p=0.9
        )
        
        answer = response["choices"][0]["text"].strip()
        
        # Boş yanıt kontrolü
        if not answer or len(answer.strip()) < 10:
            return "Üzgünüm, bu soru için uygun yanıt üretemiyorum. Lütfen sorunuzu daha açık bir şekilde belirtin."
        
        return answer
        
    except Exception as e:
        return f"Model yanıtı alınırken hata oluştu: {str(e)}"

# Test fonksiyonu
if __name__ == "__main__":
    test_question = "SQL injection nedir ve nasıl önlenir?"
    print("Test sorusu:", test_question)
    print("Yanıt:", get_answer(test_question))