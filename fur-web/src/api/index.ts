import basic from '@/api/modules/basic';
import manage from '@/api/modules/manage';
import produce from '@/api/modules/produce';
import storage from '@/api/modules/storage';
import datacenter from '@/api/modules/datacenter';
import dropdown from '@/api/modules/dropdown';

export const api = {
  ...basic,
  ...manage,
  ...produce,
  ...storage,
  ...datacenter,
  ...dropdown,
};