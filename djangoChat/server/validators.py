import os
from django.core.exceptions import ValidationError
from PIL import Image

MAX_DIMENSION_SIZE = 70
VALID_EXTENSIONS = (".jpg", ".jpeg", "png", "gif")


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > MAX_DIMENSION_SIZE or img.height > MAX_DIMENSION_SIZE:
                raise ValidationError(
                    f"Maximum allowed dimensions for images are{MAX_DIMENSION_SIZE}x{MAX_DIMENSION_SIZE}.\nYour image size is {img.size}"
                )


def validate_image_file_extensions(value):
    extension = os.path.splitext(value.name)[1]
    if extension.lower() not in VALID_EXTENSIONS:
        raise ValidationError(f"Unsupported file extension.\nTry to upload {VALID_EXTENSIONS} files.")
