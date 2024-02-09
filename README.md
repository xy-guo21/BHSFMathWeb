# BHSFMathWeb
## Frontend Install
In `frontend/` dir
1. main project
   ```
   npm run dev
   ```
2. antd
    ```
    npm install antd --save
    ```
3. link
   ```
   npx @next/codemod new-link .
   ```
4. zustand
   ```
   npm install zustand
   ```
## Backend Start
```
pip install -r requirements.txt
```

```
python manage.py makemigrations problem
python manage.py makemigrations account
python manage.py migrate problem
python manage.py migrate account
python manage.py runserver
```