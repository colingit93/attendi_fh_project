del /f db.sqlite3
python manage.py migrate
python manage.py loaddata init_users.json
python manage.py loaddata init_media.json
python manage.py loaddata init_profiles.json
