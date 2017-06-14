db.getCollection('cars').update(
    // query - select all
    {
    },
    
    // update - add createdOn field - default is Date.now()
    {
        $set: {createdOn: Date.now()}
    },
    
    // options - update multiple objects
    {
        "multi" : true
    }
);


db.getCollection('cars').update(
    // query - select all
    {
    },
    
    // update - add createdOn field - default is Date.now()
    {
        $set: {isRented: false}
    },
    
    // options - update multiple objects
    {
        "multi" : true
    }
);

db.getCollection('rentings').update(
    // query 
    {
    },
    
    // update 
    {
        $set: {rentedOn: Date.now()}
    },
    
    // options 
    {
        "multi" : true,  // update only one document
    }
);