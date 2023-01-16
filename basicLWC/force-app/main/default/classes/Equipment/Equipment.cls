public with sharing class Equipment {
    public Equipment() {}

    @AuraEnabled(cacheable=true)
    public static List<Equipment__c> getEquipmentsByCategoryWithName(string name, ID categoryId){
        string nameLike = name + '%';
        try {
            return [
                SELECT 
                    Name,
                    CategoryId__r.Name,
                    Cost__c
                FROM Equipment__c WHERE Name  LIKE :nameLike AND CategoryId__c = :categoryId
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // @AuraEnabled
    // public static List<Equipment__c> getEquipmentByCategoryId(ID id){
    //     try {
    //         return [
    //             SELECT Name, Amount FROM Equipment__c WHERE CategoryId__c = :id
    //         ];
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }
}