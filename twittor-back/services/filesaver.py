import uuid
import os

IMG_ALLOWED_EXTS = ['jpg', 'jpeg', 'png']

class WrongExtError(Exception):
    message = 'This extension is not allowed.'


class FileSaver:
    _STORAGE_PATH = 'filestorage'
    _PROFILE_IMG_PATH = f'{_STORAGE_PATH}/profile/'

    @classmethod
    def save_profile_img(cls, file):
        *_, ext = file.filename.split('.')

        if ext not in IMG_ALLOWED_EXTS:
            raise WrongExtError

        filename = f'{uuid.uuid4().hex}.{ext}'
        file.save(f'{cls._PROFILE_IMG_PATH}{filename}')

        return filename

    @classmethod
    def remove_profile_img(cls, filename):
        path = f'{cls._PROFILE_IMG_PATH}{filename}'
        os.remove(path)
