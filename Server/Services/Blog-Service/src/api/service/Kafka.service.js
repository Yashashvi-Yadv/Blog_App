import kafkaProducer from "../../events/Producers/kafka.producer.js";

class KafkaServiceBlog {
  async sendcreateblog(count, id) {
    await kafkaProducer.kafkablogcreate(count, id);
  }

  async senddeleteblog(data) {
    await kafkaProducer.kafkablogdelete(data);
  }
}
export default new KafkaServiceBlog();
