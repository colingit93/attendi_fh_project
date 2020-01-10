del /f db.sqlite3
del /f "*\migrations\*_initial.py"
del /f "*\migrations\*.pyc"
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py loaddata init_users.json
python3 manage.py loaddata init_media.json
python3 manage.py loaddata init_profiles.json
python3 manage.py loaddata init_courses.json
python3 manage.py loaddata init_coursesessions.json
python3 manage.py loaddata init_attendanceitem.json