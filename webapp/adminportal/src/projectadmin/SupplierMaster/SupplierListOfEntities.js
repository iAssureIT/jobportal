import React, { Component } from 'react';
import jQuery from 'jquery';
import 'bootstrap/js/tab.js';

import ListOfEntities from '../../coreadmin/Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';

function SupplierListOfEntities(){
    return (
    	
        <div className="">
            <ListOfEntities entity="supplier" />
        </div>
    );
}
export default SupplierListOfEntities;