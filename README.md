Task: Building a File Management API

a simple file management API using Node.js. The API should allow users to upload, list, and delete files. Additionally, implement file categorization functionality.

INSTALLATION
(node_modules are included but if any module missing add it by below command)
npm install dotenv
npm install express
npm i multer
npm install winston

add 

RUN PROJECT

Node server.js


API : 
IP - replace to your system IP

add
http://IP:3000/api/files/animal
// add file to body

get list
http://IP:3000/api/files


deleted file
http://IP:3000/api/files/animal/filename


search file
http://IP:3000/api/files/search?query=Rakesh.pdf
