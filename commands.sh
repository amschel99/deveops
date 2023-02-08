
 docker build -t image1 .
 docker run -dp 8000:5000  -v $(pwd):/app -v /app/node_modules  --name container1 image1

