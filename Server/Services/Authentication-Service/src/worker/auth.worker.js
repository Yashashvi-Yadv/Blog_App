import kafkaConsumer from "../events/Consumer/kafka.consumer.js";

(async () => {
  await kafkaConsumer.init();
  console.log("🚀 Blog Worker Started");
})();
