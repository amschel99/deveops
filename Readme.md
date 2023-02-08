
# Devops using  Node js and Docker

We will create a sample node/express applications and learn how to deploy using Docker.



## Installing docker on ubuntu

For installation, this blog is really useful https://www.zdnet.com/article/docker-101-how-to-install-docker-on-ubuntu-server-22-04/.

A common error you might get is ```permision denied ```. If you get bugged by that bug, read the solution at https://www.zdnet.com/article/docker-101-how-to-install-docker-on-ubuntu-server-22-04/

## The Dockerfile
In the root of the project, we have a file ```.Dockerfile ```

The file has the contents below:
```
FROM node:19.3.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]
```
A Docker image is a bundled snapshot of all the files that should be available to a
program running inside a container.
Our application need a base image. Think of the first command as installing the node js runtime that our application needs.

The WORKDIR command is used to define the working directory of a Docker container at any given time.

The COPY command copies the ``` package.json ``` file in our local machine to the /app directory.

After we copy the package.json and we also have node configured in docker, we can run ```npm install ``` in docker to install all he dependencies.
That's what ```RUN npm install``` does.

``` COPY . . ``` 

copies the other remaining files in our current directory to the /app directory in docker.

```EXPOSE 5000 ```  instruction informs Docker that the container listens on PORT 5000 at runtime.

Finally the last command tells docker what commands to run to start our server. In our case it's ``` npm run dev ``` as specified in the package.json 

 
## Building an image and running it from a container
```  docker build -t image1 . ```
this command will build an image by looking at the DockerFile in our current directory locally.

After an image is built, it must be run inside a container.

```docker run --detach --name containerName imageName ```
Above is the syntax of creating containers.
For our case, we will add a few more flags.

```  docker run -dp 8000:5000  -v $(pwd):/app -v /app/node_modules  --name container1 ```

``` -dp ```  is a combination of the ``` -d ``` flag and the ``` -p ``` flag. 
The former means that the container will run in the background. This means that the program started but isn’t attached to your terminal.The latter means that any traffic/requests made to PORT 8000 on your local machine will be forwarded to PORT 5000 ON docker. The PORT we exposed. 

Now we want to sync our local files to the files i docker and thats why we use volumes. the ``` -v ``` flag syncs our local working directory to the /app directory in docker. Any change we make locally will also be made in docker. the last -v flag excludes the node_modules folder i docker from the sync since we don't really need it locally as our app is running inside a docker container. Not excluding it means our local working directory will overide all files in docker and delete the node_modules in docker hence our app will not run.

Go to localhost:8000 and you should see the response message from the server. When you make a change , it will also be reflected

