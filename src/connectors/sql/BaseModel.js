import {Model, ValidationError} from 'objection';


class BaseModel extends Model {
  static timestamp = true;

  $beforeInsert(){
    this._addTimestamp('create')
  }

  $beforeUpdate(){
    this._addTimeStamp('update')
  }
  _addTimeStamp(action){
    if(this.constructor.timestamp){
      switch(action){
        case 'create':
          this.created_at = new Date.now();
          break;
        case 'update':
          this.updateted_at = new Date.now();
          break;  
      }
    }
  }
}

export default BaseModel;