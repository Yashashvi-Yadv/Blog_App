import KafkaProducer from "../events/Producers/kafka.producer.js";

export const runner = async () => {
  (async () => {
    await KafkaProducer.initkafka();
    console.log("Kafka Producer Connected");
  })();
};
