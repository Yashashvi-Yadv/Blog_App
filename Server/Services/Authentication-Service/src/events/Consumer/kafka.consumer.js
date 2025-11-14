import { kafka } from "../../config/kafka.js";
import BlogRepo from "../../repositories/blog.repository.js";
class KafkaConsumer {
  consumer;

  async init() {
    this.consumer = kafka.consumer({
      groupId: "blog-event-group",
    });

    await this.consumer.connect();
    console.log("Kafka Consumer Connected");

    // Subscribe to events from Blog service
    await this.consumer.subscribe({ topic: "blog_created" });
    await this.consumer.subscribe({ topic: "blog_deleted" });

    this.listen();
  }

  async listen() {
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const eventData = JSON.parse(message.value.toString());
        console.log(`Received event from ${topic}:`, eventData);

        try {
          switch (topic) {
            case "blog_created":
              await BlogRepo.handlecreated(eventData);
              break;

            case "blog_deleted":
              await BlogRepo.handledeleted(eventData);
              break;
            default:
              console.log("Unknown topic:", topic);
          }
        } catch (error) {
          console.error(" Error handling event:", error);
        }
      },
    });
  }
}

export default new KafkaConsumer();
