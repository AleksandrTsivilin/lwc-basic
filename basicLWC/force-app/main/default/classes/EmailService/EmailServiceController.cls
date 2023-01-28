public with sharing class EmailServiceController {
    public EmailServiceController() {

    }

    @AuraEnabled
    public static Boolean sendSingleEmail(
        string subject, string body, ID contentDocId, ID oppId
        //List<string> recipientList, string subject, string body, List<string> filesIds
    ){
        try{
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            List<string> recipientList = getRecipients(oppId);//new List<string> {'q0992358472@gmail.com'};

            ID contVersId = getContentVersId(contentDocId);
            email.setToAddresses(recipientList);
            email.setCcAddresses(recipientList);
            email.setBccAddresses(recipientList);
            email.setSubject(subject);
            email.setPlainTextBody(body);
            email.setEntityAttachments(new List<Id>{contVersId});
        
            return Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email})
                .get(0).isSuccess();
        }catch(Exception e){
            throw new EmailException(e.getMessage());
        }
    }

    private static ID getContentVersId(ID contentDocId){
        List<ContentVersion> contVers = [
            SELECT 
                Id 
            FROM ContentVersion 
            WHERE ContentDocumentId =:contentDocId];
        return contVers.get(0).Id;
    }

    private static List<string> getRecipients(ID oppId){
        
        List<OpportunityContactRole> oppContRoles = [
            SELECT 
                Contact.Email 
            FROM OpportunityContactRole 
            WHERE OpportunityId = :oppId AND isPrimary = TRUE
        ];
        
        return new List<string>{oppContRoles.get(0).Contact.Email};
        
    }
}