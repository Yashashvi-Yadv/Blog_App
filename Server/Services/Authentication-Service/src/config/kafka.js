import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "blog-service",
  brokers: [process.env.KAFKA_BROKER],
});
