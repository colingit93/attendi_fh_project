# attendi

[GitHub](https://github.com/colingit93/attendi_fh_project)

The goal of the project is to create an online attendance list, where students can confirm their presence at a course on their mobile phone or computer. The application will provide an interface for students and lecturers. Lecturers will be able to create and manage their courses, add and remove students as well as setting course times. Students will be presented with a list of courses they need to attend and they are able to confirm their presence. Confirming attendance is confirmed by entering a passphrase into the attendance item provided by the lecturer. The application should only be accessible on the lecturing premises.

# Team

Marcel Kahr: [GitHub](https://github.com/colingit93/attendi_fh_project)
Colin Jochum: [GitHub](https://github.com/colingit93/attendi_fh_project)
Tom Kleinhapl: [GitHub](https://github.com/colingit93/attendi_fh_project)
~~Tripolt Christoph:~~

**Note:** Commits in GitHub from Author Colin Jochum were actually from colingit93!

# Project Proposal

| Project Name                                                 | attendi.com                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| GitHub URL                                                   | https://github.com/colingit93/attendi.git                    |
| Team Members                                                 | Colin Jochum, Tom Kleinhapl, Marcel Kahr                     |
| State Topic                                                  | Getting Organised                                            |
| Project Abstract <br />(What is the project about)           | The idea of the project arose from a problem Colin faces every day, he cannot sign the attendance list because he never brings a pen to class. The goal of the project is to create an online attendance list, where students can confirm their presence at a course on their mobile phone or computer. The application will provide an interface for students and lecturers. Lecturers will be able to create and manage their courses, add and remove students as well as setting course times. Students will be presented with a list of courses they need to attend and once the course starts, they are able to confirm their presence. Confirming attendance could be confirmed by entering a passphrase provided by the lecturer. The application should only be accessible on the lecturing premises. |
| USP of the project (How does the project differ from other projects) | The project idea was not inspired any application, we did however find an existing project that is seemingly quite similar.<br/>Existing solution:<br/>MyAT (MyAttendanceTracker.com) -> no detailed information of all features given<br/>The MyAT application differs in that:<br/>• It doesn’t use Angular Framework<br/>• It doesn’t target the FH Joanneum<br/>• No feature to upload absence confirmation documents |
| User Stories (Who, wants what and why?)                      | 1. As lecturer I want to create lectures in my dashboard on a certain date, at a certain time and for specific student groups (classes) to confirm students are attending my course.<br/>2. As a student I want to be able to upload an absence note to inform the lecturer of my absence.<br/>3. As a student I want to see some statistics regarding attendance on my dashboard, so I can quickly assess the progress of attendance.<br/>4. As a student I want I want to see for which courses attendance is mandatory to know which courses I absolutely need to attend.<br/>5. As a student I want to sign the attendance list to confirm my presence at the course. |

![UML-BackendModel](https://github.com/colingit93/attendi_fh_project/blob/master/UML-BackendModel.jpeg)



## Installation

####Backend Installation

Switch into your virtual environment first which should have the necessary libraries installed! The required libraried are listen in the **Backend** section of this README.

if the media folder exists it needs to be deleted  
python3 manage.py makemigrations  
python3 manage.py migrate  
python3 manage.py loaddata initial_data.json  
python3 manage.py runserver  

#### Frontend Intallation

Install the necessary dependencies and modules with: ng install

Necessary dependencies are listed in the: package-lock.json

Run the backend with ng serve

**Login Credentials from fixtures:**
Administrator: admin admin
Students: greta django123; susi susi; sam sam; tom tom; marcel marcel; colin colin; kevin kevin; julia julia; martina martina
Lecturers: liam liam; karl karl; stefan stefan; werner werner; robert robert;

## Backend

Use the *initial_data.json* fixture when creating the backend!

Default User: admin PW: admin
Default Student: greta PW: greta

URL: http://localhost:8000/ http://localhost:8000/admin/

Libraries: django==2.2.7; djangorestframework==3.10.3; drf-yasg==1.17.0; djangorestframework-jwt==1.11.0

###Backend Models

**Media:** The administrator can set profile pictures for the students and lecturers.

**Profile:** A new profile is created when a new user in the default Django *Users* model is created. This means that the *Profile* model is derived from the *Users* model and therefore share the same id/primary_key! It is important to create a new user in the *Users* model first because otherwise the primary key in the profile model would not match anymore which is important! Inside the created Profile it is possible to set the *Date of birth*, *Student Group*, *Image*. This task can only be done by the Administrator.
*Date of birth*: When was the student born
*Student Group:* Select the Group in which the student is put into. This plays a big role in the Course Sessions Model where a bunch of students is assigned to a Course Session.
*Image:* Assign an Image to the Student/lecturer

**Course:** This model is one of the main Objects of this project. A course consists has the attributes *Name*, *Description*, *Students*, *Lecturer* and consists of multiple smaller course sessions! Courses can only be created by Administrators or Lecturers. 
*Name:* The name of the Course e.g. Biology, Mathematics
*Description:* Short description what the course is about
*Students:* Assign individiual students to the course
*Lecturer:* Assign the lecturer of the course
**When a new course is created the backend will automatically create a Statistic item for each Student assigned to the course!**

**Course Session:** A course session is a single session which students can attend. **If a new course session is created (by administrator or lecturer) the student automatically gets a new attendance item for this course session! It is also checked if the student is in the selected group for the new course session.** If the student attends the course session he needs to check the *present* checkbox. However there is a Password for each course session which has to be entered when the students want to fill out his attendance item. This prevents students abusing the system! They have to know the password which the lecturer tells the students in the course session. The students need to enter this password when filling out their attendance item.
*Location:* The room/location where the course session takes place.
*Mandatory:* This boolean value defines if the course session is mandatory for the students or if it is an optional course session which the students do not need to attend.
*Date:* The calendar date when the course session takes place.
*Start time:* Time when the course session starts
*End time:* Time when the course session end
*Course:* The course of the course session
*Student group:* Select the student group for the course session
*Password:* Password of the course session. This password needs to be entered in the Attendance Item of the student and prevents the abuse of the system.

**Attendance Item:** The attendance item is automatically created for the student if a new course session is created. The student has to be assigned to the course to get the attendance item. The student is able to tick the **present** checkbox which means he attended the course session.
*student:* Student which the attendance item is for
*course_session:* The course session to which the attendance item is linked to
*present:* Shows if the student attendet the course session or not
*absence_note:* Student can upload an absence note here

**Statistic:** The statistics give the student a quick overview of the statistics. In addition to that a visual bar graph gives a visual demonstration on how many course session the student attended for the courses he is assigned to. For the visual demonstration the ng2-charts library is used. Each course the student attends has its own statistic model and it gets automatically created when a student is assigned to a course.
*course:* The course for which the statistics get shown
*total_course_sessions:* The total ammount of course sessions for this course
*total_mandatory_course_sessions:* The total ammount of mandatory ammount of course session for this course
*visited_course_sessions:* The ammount of course sessions the student actually visited
*attendance_percentage:* visited_course_sessions/total_course_sessions - How many course sessions the student attended out of the total course sessions
*course_sessions_missed:* The ammount of course sesssions the student missed

### Security

REST framework JWT Auth: https://jpadilla.github.io/django-rest-framework-jwt/
**Auth. Token:** curl -X POST -d "username=admin&password=password123" http://localhost:8000/api-token-auth/
**Refresh Auth. Token:** curl -X POST -H "Content-Type: application/json" -d '{"token":"<EXISTING_TOKEN>"}' http://localhost:8000/api-token-refresh/

Token Expiration Time: 3 days

## Frontend

URL: http://localhost:4200/

Login with Student or Lecturer Credentials

