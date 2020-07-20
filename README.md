# DueDateCalculator
Solution that implements an issue tracking system’s due date calculator.

USAGE GUIDE:

First, open the directory where Dockerfile is, then build and run the app with:

docker build -t sshlich/duedatecalculator . && docker run -p 49160:8080 -d sshlich/duedatecalculator

The app will be running in background mode on custom port (49160);
To make queries we'll be using cURL:
curl -d "submitDate=1995-03-010T16:59&turnaroundTime=25&exit=0" -X POST http://localhost:49160/

submitDate:
is a date when we are receiving issue ticket in the format YYYY-MM-DDThh:mm ;

turnaroundTime:
How much time we'll need to resolve the ticket in hours;

exit:
should be 1 or 0, this is query to stop the server;


Enother way to stop the server is using:
docker ps 
^ to get the image id
then:
docker kill <image id>