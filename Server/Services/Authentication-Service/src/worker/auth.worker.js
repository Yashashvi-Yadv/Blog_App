import kafkaConsumer from "../events/Consumer/kafka.consumer.js";

export const startkafkaconsumer = () => {
  (async () => {
    await kafkaConsumer.init();
    console.log("🚀 Blog Worker Started");
  })();
};
