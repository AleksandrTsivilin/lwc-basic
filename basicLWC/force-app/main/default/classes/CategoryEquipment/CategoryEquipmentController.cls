public with sharing class CategoryEquipmentController {
    public CategoryEquipmentController() {}

    @AuraEnabled(Cacheable = true)
    public static List<Category_Equipment__c> getCategories(){
        try {
            return [
                SELECT 
                    Id, Name 
                FROM Category_Equipment__c
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}