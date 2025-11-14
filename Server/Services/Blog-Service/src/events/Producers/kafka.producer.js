import { kafka } from "../../config/kafka.js";
const producer = kafka.producer();
class KafkaProducer {
  async initkafka() {
    try {
      await producer.connect();
      console.log("kafka is connected");
    } catch (err) {
      console.log(err);
    }
  }

  async kafkablogcreate(data) {
    await producer.send({
      topic: "blog_created",
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });
  }
  async kafkablogdelete(data) {
    await producer.send({
      topic: "blog_deleted",
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });
  }
}
