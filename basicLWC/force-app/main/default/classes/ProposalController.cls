public with sharing class ProposalController {
    
    public ProposalController() {}

    @AuraEnabled(cacheable = true)
    public static List<Proposal__c> getProposals(ID oppId){        
        try {

            return [
                SELECT 
                    Name, 
                    Total_Price__c, 
                    Status__c,
                    Total_Quantity__c 
                FROM Proposal__c
                WHERE Opportunity_Id__c = :oppId
                
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static ID createProposalWithEquipments
        (ID oppId, List<Equipment__c> equipments){
        System.debug('equipments' + equipments);
        string name = getRandomString('proposal');
        try {

            Proposal__c proposal = new Proposal__c(
                Name = name,
                Opportunity_Id__c = oppId,
                Status__c = 'Draft'
            );
            Database.SaveResult result = Database.Insert(proposal, false);
            ID proposalId = result.getId();
            List<Proposal_Equipment__c> propEquipments = getProposal_Equipments(equipments, proposalId);
            Database.Insert(propEquipments, false);

            return result.getId();

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string generateProposal(ID proposalId, ID oppId){
        try {
            Blob body;
            PageReference pageRef = new PageReference ('/apex/TemplateForProposal');
            
            pageRef.getParameters().put('proposalId', proposalId);
            pageRef.getParameters().put('oppId', oppId);
            body = pageRef.getContentAsPDF();
            
            ContentVersion cont = new ContentVersion();
            cont.VersionData = body;

            
            cont.ContentLocation = 'S';
            cont.PathOnClient = 'TemplateForProposal.pdf';
            cont.Title = 'TemplateForProposal' + ' ' + Datetime.now();
            insert cont;

            List<ContentVersion> contentVersions = [
                SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cont.Id
            ];

            ContentDocumentLink cdLink = new ContentDocumentLink();
            cdLink.LinkedEntityId = proposalId;
            cdLink.ContentDocumentId = contentVersions.get(0).ContentDocumentId;
            cdLink.shareType = 'V';
            insert cdLink;
            return cdLink.ContentDocumentId;            
        } catch (Exception e) {
            
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static ID deleteProposal(ID id){
        try {
            Database.DeleteResult result = Database.delete(id);
            return result.getId();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    private static List<Proposal_Equipment__c> getProposal_Equipments
        (List<Equipment__c> equipments, ID proposalId){
            List<Proposal_Equipment__c> propEquipments = new List<Proposal_Equipment__c>();
            for (Equipment__c equ : equipments){

                string name = getRandomString('proposal');
                Proposal_Equipment__c propEqu = new Proposal_Equipment__c(
                    Name = name,
                    EquipmentId__c = equ.Id,
                    Proposal_Id__c = proposalId

                );
                propEquipments.add(propEqu);
            }
            return propEquipments;
        }

    private static string getRandomString(string start){
        return start + ' ' + DateTime.now();
    }
}