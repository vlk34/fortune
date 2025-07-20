from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import jsonify, request
from dotenv import load_dotenv
import json
from src.utils.auth import verify_supabase_token
from werkzeug.utils import secure_filename
import uuid
import os
from PIL import Image
import io
from supabase import create_client, Client
from flask import current_app
from src.utils.model import Model
from src.utils.prompt_generator import build_kahve_fali_prompt

load_dotenv()

blp = Blueprint('kahve_fali', __name__, description='Kahve Fali Operations')

ALLOWED_EXTENSIONS = {'webp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@blp.route('/kahve-fali', methods=['POST'])
class KahveFali(MethodView):
    def post(self):
        try:
            user_prompt = request.form.get('prompt', '')

            # Check if the request contains a file
            if 'image' not in request.files:
                return jsonify({
                    'error': 'No image file provided',
                    'message': 'Please upload an image'
                }), 400
            
            file = request.files['image']
            
            # Check if file was actually selected
            if file.filename == '':
                return jsonify({
                    'error': 'No file selected',
                    'message': 'Please select a photo to upload'
                }), 400
            
            # Validate file type
            if not allowed_file(file.filename):
                return jsonify({
                    'error': 'Invalid file type',
                    'message': 'Please upload a valid image file (PNG, JPG, JPEG, GIF, WEBP)'
                }), 400
            
            # Secure the filename
            filename = secure_filename(file.filename)
            
            # Always store images in WEBP format to save storage space
            unique_filename = f"{uuid.uuid4()}.webp"

            # Get file size
            file.seek(0, os.SEEK_END)
            file_size = file.tell()
            file.seek(0)  # Reset file pointer
            
            # Check file size (limit to 10MB)
            max_size = 10 * 1024 * 1024  # 10MB
            if file_size > max_size:
                return jsonify({
                    'error': 'File too large',
                    'message': 'Please upload an image smaller than 10MB'
                }), 400
            
            # Read original file bytes
            original_content = file.read()

            file_content = original_content
            file_size = len(file_content)

            # Still need to create image object for AI analysis
            image = Image.open(io.BytesIO(original_content))

            # # Initialize Supabase client
            # supabase_url = current_app.config['SUPABASE_URL']
            # supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('SUPABASE_ANON_KEY')
            # supabase: Client = create_client(supabase_url, supabase_key)

            # # Upload photo to Supabase Storage
            # try:
            #     # Create storage path: food-photos/user_id/unique_filename
            #     storage_path = f"food-photos/{g.current_user['id']}/{unique_filename}"
                
            #     # Upload to Supabase Storage - if this succeeds without exception, upload is successful
            #     supabase.storage.from_('food-images').upload(
            #         file=file_content,
            #         path=storage_path,
            #         file_options={
            #             "content-type": "image/webp",
            #             "upsert": False
            #         }
            #     )
                
            #     print(f"Successfully uploaded photo to storage path: {storage_path}")
                    
            # except Exception as e:
            #     return jsonify({
            #         'error': 'Failed to upload photo to storage',
            #         'message': f'Could not save photo: {str(e)}'
            #     }), 500

            # ===== Generate Fortune =====
            model = Model()

            messages = build_kahve_fali_prompt(user_prompt, image)
            
            response = model.gemini_chat_completion(messages)

            return jsonify({
                'fortune': response
            })


        except Exception as e:
            return jsonify({
                'error': 'An error occurred',
                'message': str(e)
            }), 500





