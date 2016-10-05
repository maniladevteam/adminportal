package iSurvey.com.emailer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import iSurvey.com.dao.ConnectionDAO;
import iSurvey.com.helper.json.ResultSetConverter;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;

public class SurveyEmailer {
	public static void SendSurvey(String to,String userUUID, String surveyUUID, String toName, String messageBody) {

		String from = "devmanila@thomsonreuters.com";
		String host = "mailhub.tfn.com";

		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", host);
		Session session = Session.getDefaultInstance(properties);
		//http://localhost:8080/iSurvey/tests/views/client/?u=1b7c98fe00ee8071c42e2862b422ff8f&s=d93a404a-86f8-11e5-b4e6-00059a3c7a00
		try {
			/*MimeMessage message = new MimeMessage(session);
			 MimeMultipart multipart = new MimeMultipart("related");
			 BodyPart messageBodyPart = new MimeBodyPart();
	         String htmlText = "<H1>Hello</H1><img src=\"cid:image\">";
	         messageBodyPart.setContent(htmlText, "text/html");
	         // add it
	         multipart.addBodyPart(messageBodyPart);
			
	         messageBodyPart.setContent(htmlText, "text/html");
	         // add it
	         multipart.addBodyPart(messageBodyPart);
			*/
			StringBuilder msgBody = new StringBuilder();
			msgBody.append("<body style='font:segoe UI'; margin:auto; bgcolor='#f0f0f0  text-align: justify; text-justify: inter-word;'> <div style='margin:auto;'>");
			msgBody.append("<img src=cid:image> </div>");
			msgBody.append("Hi ");
			msgBody.append(toName);
			msgBody.append(",");
			msgBody.append("<p>&nbsp;</p>");  
			msgBody.append(messageBody);
			msgBody.append("<p>&nbsp;</p>");
			msgBody.append("<a href='http://service.reporting.ime.reuters.com:8080/iSurvey/tests/views/client/?u=");
			msgBody.append(userUUID);
			msgBody.append("&");
			msgBody.append("s=" + surveyUUID + "'>");
			msgBody.append("Click here</a> to take our short survey!!");
			
			msgBody.append("<p>Thanks</p>");
			msgBody.append("<p>Yours Truly,</p>");
			msgBody.append("<p>&nbsp;</p>");
			msgBody.append("<p>&nbsp;</p>");
			msgBody.append("<p>&nbsp;</p>");
			msgBody.append("Manila Development Team");
			
			
			/*
			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			message.setSubject("No Reply : New Request from " + "Test Email From Mar for the survey");
			message.setContent(msgBody.toString(), "text/html");
			Transport.send(message);*/
			 // Create a default MimeMessage object.
	         Message message = new MimeMessage(session);

	         // Set From: header field of the header.
	         message.setFrom(new InternetAddress(from));

	         // Set To: header field of the header.
	         message.setRecipients(Message.RecipientType.TO,
	            InternetAddress.parse(to));

	         // Set Subject: header field
	         message.setSubject("No Reply : New Request from " + "Test Email From Mar for the survey");

	         // This mail has 2 part, the BODY and the embedded image
	         MimeMultipart multipart = new MimeMultipart("related");
  
	         // first part (the html)
	         BodyPart messageBodyPart = new MimeBodyPart();
	         String htmlText = msgBody.toString();
	         messageBodyPart.setContent(htmlText, "text/html");
	         // add it
	         multipart.addBodyPart(messageBodyPart);

	         // second part (the image)
	         messageBodyPart = new MimeBodyPart();
	         DataSource fds = new FileDataSource(
	            "///C:/logoemail.png");

	         messageBodyPart.setDataHandler(new DataHandler(fds));
	         messageBodyPart.setHeader("Content-ID", "<image>");

	         // add image to the multipart
	         multipart.addBodyPart(messageBodyPart);

	         // put everything together
	         message.setContent(multipart);
	         // Send message
	         Transport.send(message);

	         System.out.println("Sent message successfully....");
			
		} catch (Exception e) {
			e.getMessage();
		}
	}

}
