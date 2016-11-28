# TTY docker training

### Running with docker

docker network create tty-training

docker build ./frontend --tag tty-frontend
docker run -d --name frontend --network tty-training -h frontend -p 8080:80 tty-frontend

docker run -d --name mongo -p 91:27017 -p 92:28017 --network tty-training mongo:3 mongod --rest

docker build ./rabbitmq --tag tty-rabbitmq
docker run -d --name rabbitmq -p 7998:4369 -p 7999:5671 -p 8000:5672 -p 8001:15672 -p 8002:25672 --network tty-training -h rabbitmq tty-rabbitmq

docker build ./logstash --tag tty-logstash
docker run -d --name logstash -p 81:2000 --network tty-training -h logstash tty-logstash

docker build ./logstash2 --tag tty-logstash2
docker run -d --name logstash2 -p 82:2000 --network tty-training -h logstash2 tty-logstash2

docker build ./haproxy --tag tty-haproxy
docker run -d --name haproxy -p 80:80 --network tty-training tty-haproxy
