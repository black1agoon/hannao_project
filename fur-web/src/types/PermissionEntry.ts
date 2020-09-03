export default interface PermissionEntry {
  id: string;
  name: string;
  btnKey: string;
  pid: string;
  resourceType: string;
  seq: number;
  url: string;
  logo?: string;
  childUserPermission: Array<PermissionEntry>;
}
