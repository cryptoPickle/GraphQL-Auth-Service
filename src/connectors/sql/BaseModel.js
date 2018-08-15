import {Model, ValidationError} from 'objection';
import moment from 'moment';

class BaseModel extends Model {
  static timestamp = true;

  $beforeInsert(){
    this._addTimeStamp('create')
  }

  $beforeUpdate(){
    this._addTimeStamp('update')
  }
  _addTimeStamp(action){
    if(this.constructor.timestamp){
      switch(action){
        case 'create':
          this.created_at =  moment().format('x');
          break;
        case 'update':
          this.updated_at =  moment().format('x');
          break;  
      }
    }
  }
}


export default BaseModel;