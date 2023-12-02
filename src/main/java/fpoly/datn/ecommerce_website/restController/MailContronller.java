package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.service.IMailSendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailContronller {
    @Autowired
    private IMailSendService iMailSendService;
    @RequestMapping(value = "/send-mail", method = RequestMethod.POST)
    public ResponseEntity<?> getAll(
            @RequestParam(required = false) String mail,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String content) {
      Boolean isSuccess =  iMailSendService.sendEmailTest(mail, subject, content);
        return new ResponseEntity<>(isSuccess, HttpStatus.OK);
    }
}