package fpoly.datn.ecommerce_website.service;

public interface IMailSendService {
    Boolean sendEmailTest(String email, String subject, String content);
}
