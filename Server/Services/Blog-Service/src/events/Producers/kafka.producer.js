import { kafka } from "../../config/kafka.js";
const producer = kafka.producer();

class KafkaProducer {
  constructor() {
    this.isConnected = false;
  }

  async initkafka() {
    try {
      if (!this.isConnected) {
        await producer.connect();
        this.isConnected = true;
        console.log("Kafka Producer Connected");
      }
    } catch (err) {
      console.log("Kafka connection error:", err);
    }
  }

  async kafkablogcreate(count, id) {
    const data = { count, id };

    if (!this.isConnected) await this.initkafka();

    return producer.send({
      topic: "blog_created",
      messages: [{ value: JSON.stringify(data) }],
    });
  }

  async kafkablogdelete(count, id) {
    const data = { count, id };
    if (!this.isConnected) await this.initkafka();

    return producer.send({
      topic: "blog_deleted",
      messages: [{ value: JSON.stringify(data) }],
    });
  }
}

export default new KafkaProducer();
