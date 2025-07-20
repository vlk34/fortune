import io
import base64

def build_kahve_fali_prompt(user_prompt, image):
    buffered = io.BytesIO()

    # Convert to RGB if needed (WEBP does not support P or RGBA in some cases for encoding without alpha)
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")

    # Save as WEBP with moderate compression to make payload smaller
    image.save(buffered, format="WEBP", quality=80)
    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

    # ===== Create User Prompt =====
    prompt_text = "I want you to analyze this coffee and give me a fortune-telling about it."
    if user_prompt:
        prompt_text += f" {user_prompt}"
    current_user_prompt = [
        {
            "type": "text",
            "text": prompt_text
        },
        {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/webp;base64,{img_base64}"
            }
        }
    ]
    
    # ===== Create System Prompt =====
    with open("backend/src/storage/kahve_fali_prompt.txt", "r", encoding="utf-8") as f:
        system_prompt = f.read()

    # ===== Create Messages =====
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": current_user_prompt}
    ]

    return messages
