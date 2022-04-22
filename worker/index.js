const keys = require('./keys');
const redis = require('redis');


const redisClient = redis.createCleint({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicat();

function fib(index){
  if (index < 2) return 1;
  return fib(index-1) + fib(index -2);
}


sub.on('message', (channel, mesage) =>{
  redisClient.hset('values', message, fib(parseInt(message)));
})
