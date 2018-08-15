import Model from '../../connectors/sql/Model';
import UserModel from '../User/UserModel';

class TokenModel extends Model{
  static tableName = 'tokens';
  static relationMappings = {
    collection: {
      relation: Model.HasOneRelation,
      modelClass: UserModel,
      join: {
        from: 'tokens.user_id',
        to: 'users.id'
      }
    }
  }
};


export default TokenModel;