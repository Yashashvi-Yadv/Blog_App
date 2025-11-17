import kafkaProducer from "../../events/Producers/kafka.producer.js";

class KafkaServiceBlog {
  async sendcreateblog(count, id) {
    await kafkaProducer.kafkablogcreate(count, id);
  }

  async senddeleteblog(count, id) {
    await kafkaProducer.kafkablogdelete(count, id);
  }
}
export default new KafkaServiceBlog();
