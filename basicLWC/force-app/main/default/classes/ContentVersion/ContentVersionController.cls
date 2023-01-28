public with sharing class ContentVersionController {
    public ContentVersionController() {}

    @AuraEnabled
    public static List<ContentVersion> getContentVersionIdByContentDocumentLinkId(ID id){
        try {
            return [SELECT Id FROM ContentVersion WHERE ContentDocumentId =:id];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}