# Setup 
Prerequisites: 
You have installed python3.10 and pip; 

1) Execute in console 
```
git clone https://github.com/dolho/sayhelloapplication.git
cd sayhelloapplication
```
Or download the code as zip file and open the root folder of the project.

2) (Optionally) [Create](https://www.geeksforgeeks.org/creating-python-virtual-environment-windows-linux/) and start virtual environment

3) Execute in console 
```
pip install -r requirements.txt 
```

4)  In the root directory of the project create .env file, and add following strings in it
```
DATABASE=your_database
USER_DB=your_user
PASSWORD_DB=your_user_password
HOST_DB=your_database_host
PORT_DB=your_database_port
(optionally)SECRET_KEY=your_secret_key
```
You can generate secret key with [django](https://tech.serhatteker.com/post/2020-01/django-create-secret-key/)

5) Execute in console 
```
python manage.py makemigrations
python manage.py migrate
```
5) Run the application with following command:
```
python manage.py runserver
```
If port 8000 is already in use, you can run application on a different port with next command: 
```
python manage.py runserver 9999
```
Instead of 9999 you can choose any other available port 