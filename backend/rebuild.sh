rm -rf db.sqlite3
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py loaddata init_users.json
python3 manage.py loaddata init_media.json
python3 manage.py loaddata init_profiles.json
python3 manage.py loaddata init_courses.json
python3 manage.py loaddata init_coursesessions.json
python3 manage.py loaddata init_attendanceitem.json
python3 manage.py runserver