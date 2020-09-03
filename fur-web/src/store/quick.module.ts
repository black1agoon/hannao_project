import { Module } from 'vuex';
import { AnyObject } from '@/types';
import { Component } from 'vue';

interface QuickState {
  opened: boolean;
  title: string;
  content: string | Component;
}

const quickModule: Module<QuickState, AnyObject> = {
  namespaced: true,

  state: {
    opened: false,
    title: 'Quick Panel',
    content: 'div',
  },
  mutations: {
    toggle(state) {
      state.opened = !state.opened;
    },
    open(state, { title, content }) {
      state.opened = true;
      state.title = title;
      state.content = content || 'div';
    },
    close(state) {
      state.opened = false;
    },
  },
  actions: {},
};

export default quickModule;
