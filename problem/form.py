from django import forms
from .models import UploadedFile

class UploadedFileForm(forms.ModelForm):
    class Meta:
        model = UploadedFile
        fields = ['file']  # Specify the fields you want to include in the form

    def clean_file(self):
        file = self.cleaned_data.get('file')
        # Add custom validation logic here if needed
        # For example, you can check the file size or file type
        if file.size > 10 * 1024 * 1024:  # 10 MB
            raise forms.ValidationError("File size cannot exceed 10 MB.")
        return file
