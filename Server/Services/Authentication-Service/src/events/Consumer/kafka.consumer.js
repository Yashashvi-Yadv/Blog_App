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

    // Subscribe to blog events
    await this.consumer.subscribe({ topic: "blog_created" });
    await this.consumer.subscribe({ topic: "blog_deleted" });

    this.listen();
  }

  async listen() {
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const eventData = JSON.parse(message.value.toString());

        console.log("=====================================");

        try {
          switch (topic) {
            case "blog_created":
              console.log("➡ Handling blog_created event...");

              const { count, id } = eventData;

              if (!id) {
                console.log("❌ ERROR: eventData.id is missing!");
                return;
              }

              const res = await BlogRepo.handlecreated(count, id);

              if (res) {
                console.log("✅ Blog count updated successfully");
              }
              break;

            case "blog_deleted":
              console.log("➡ Handling blog_deleted event...");
              console.log(eventData);

              const deleted = await BlogRepo.handledeleted(eventData);

              if (deleted) {
                console.log("🗑 Blog deleted event processed");
              }
              break;

            default:
              console.log("❓ Unknown topic received:", topic);
          }
        } catch (error) {
          console.error("❌ Error handling event:", error);
        }

        console.log("=====================================");
      },
    });
  }
}

export default new KafkaConsumer();
