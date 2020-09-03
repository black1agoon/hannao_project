export default interface UserModel {
  userName: string;
  userId: string;
  token: string;
  baseUrl: string;
  permissionList?: Array<object>;
}
