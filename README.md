# ChatGPT

ChatGPT Python Flask example using https://beta.openai.com/docs/quickstart

 ![Alt text](ChatGPT.JPG?raw=true?raw=true "ChatGPT")
 
 
# To run:

     git clone https://github.com/RamSailopal/ChatGPT.git
     cd ChatGPT
     cd app
     
Amend the .env file and add you openai API token (attained from https://openai.com/api/)

     cd ..
     docker run -it --entrypoint /home/app/entrypoint.sh -v $PWD/app:/home/app -p 5000:5000 docker.io/ubuntu
     
 Navigate to http://localhost:5000
 
 Ask a question
 
 Get the answer
