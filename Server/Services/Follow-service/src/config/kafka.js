import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "blog-service",
  brokers: ["localhost:9092"],
});
