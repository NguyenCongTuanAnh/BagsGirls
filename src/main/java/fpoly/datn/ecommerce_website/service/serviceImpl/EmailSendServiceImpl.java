package fpoly.datn.ecommerce_website.service.serviceImpl;

import fpoly.datn.ecommerce_website.service.IMailSendService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailSendServiceImpl implements IMailSendService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String fromEmail;
    @Override
    public Boolean sendEmailTest(String email, String subject, String content) {
     try {
         MimeMessage mimeMessage = javaMailSender.createMimeMessage();
         MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false);

         mimeMessageHelper.setFrom(fromEmail);
         mimeMessageHelper.setTo(email);

         mimeMessageHelper.setSubject(subject);
         mimeMessageHelper.setText(content);
         javaMailSender.send(mimeMessage);
     }catch (Exception e){
         throw new RuntimeException(e);
     }
        return true;
    }

}
