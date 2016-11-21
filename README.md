# TTY docker training

### Running with docker

docker network create tty-training

docker build ./frontend --tag tty-frontend
docker run -d --name frontend --network tty-training -h frontend -p 8080:80 tty-frontend

docker build ./haproxy --tag tty-haproxy
docker run -d --name haproxy -p 80:80 --network tty-training tty-haproxy