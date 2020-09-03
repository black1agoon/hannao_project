interface FeatureAttributes {
  title: string;
  url?: string;
  dom?: string;
  picUrl?: string;
  memo?: string;
  timeStamp?: string;
  parentName?: string;
  parentGuid?: string;
}

export default interface FeatureEntry {
  id: string;
  text: string;
  state: string;
  checked: boolean;
  attributes: FeatureAttributes;
  children: Array<FeatureEntry>;
}
