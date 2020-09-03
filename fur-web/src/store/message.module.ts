import axios from 'axios';
import { Notification } from 'element-ui';
import { HubConnectionBuilder } from '@microsoft/signalr';
import router from '@/router';
import { createFormData } from '@/utils/request';

let connection: any = null;
const linkTimeout = 30000;

export const messageModule = {
  namespaced: true,

  state: {
    todoList: [],
    messages: [],
    readingList: [],
  },

  mutations: {
    setMessages(state: any, msgList: any) {
      state.messages = msgList;
    },
    addMessage(state: any, msg: any) {
      state.messages.unshift(msg);
    },
    removeMessage(state: any, msg: any) {
      const idx = state.messages.findIndex((_msg: any) => _msg.id === msg.id);
      if (idx >= 0) {
        state.messages.splice(idx, 1);
      }
    },
    setTodoList(state: any, todoList: any) {
      state.todoList = todoList;
    },
    addTodo(state: any, todo: any) {
      state.todoList.unshift(todo);
    },
    removeTodo(state: any, todo: any) {
      const idx = state.todoList.findIndex((_todo: any) => _todo.id === todo.id);
      if (idx >= 0) {
        state.todoList.splice(idx, 1);
      }
    },
    addToReading(state: any, msg: any) {
      const msgIdx = state.readingList.findIndex((item: any) => item.id === msg.id);
      if (msgIdx < 0) {
        state.readingList.push(msg);
      }
    },
    removeFromReading(state: any, msg: any) {
      const msgIdx = state.readingList.findIndex((item: any) => item.id === msg.id);
      if (msgIdx >= 0) {
        state.readingList.splice(msgIdx, 1);
      }
    },
  },

  actions: {
    startLink({ dispatch, rootState }: any) {
      if (!rootState.user.userId) {
        return;
      }
      return dispatch('getUnread').then(() => {
        dispatch('connect');
      });
    },
    connect({ dispatch }: any) {
      if (!connection || connection.connectionState === 'Disconnected') {
        connection = connection || new HubConnectionBuilder().withUrl('/systemHub').build();
        connection.on('getPush', (msg: any) => {
          dispatch('showMessage', msg);
        });
        connection.on('getItem', (msg: any) => {
          dispatch('showMessage', msg);
        });
        connection.onclose(() => {
          window.setTimeout(() => {
            dispatch('startLink');
          }, linkTimeout);
        });
        connection.start().catch((err: any) => {
          console.warn(err.toString());
          window.setTimeout(() => {
            dispatch('startLink');
          }, linkTimeout);
        });
      }
    },
    stopLink() {
      connection?.stop();
      connection = null;
    },
    getUnread({ commit }: any) {
      return axios.get('/Api/Message/GetUnRead').then((msgList: any = []) => {
        commit('setMessages', msgList.filter((msg: any) => msg.msgType === 1));
        commit('setTodoList', msgList.filter((msg: any) => msg.msgType !== 1));
      });
    },
    showMessage({ commit }: any, msg: any) {
      if (msg.msgType === 1) {
        commit('addMessage', msg);
      } else {
        commit('addTodo', msg);
      }
      Notification.info({ duration: 10000, title: msg.senderName, message: msg.msgTitle, position: 'bottom-right' });
    },
    clearMessages({ commit }: any) {
      return axios.get('/Api/Message/AllMsgRead').then(() => {
        commit('setMessages', []);
      });
    },
    clearTodoList({ commit }: any) {
      return axios.get('/Api/Message/AllAuditRead').then(() => {
        commit('setTodoList', []);
      });
    },
    readMessage({ commit }: any, msg: any) {
      return axios.post('/Api/Message/SetSingleMsgIsRead', createFormData({ msgid: msg.id })).then(() => {
        commit('removeFromReading', msg);
        if (msg.msgType === 1) {
          commit('removeMessage', msg);
        } else {
          commit('removeTodo', msg);
        }
      });
    },
    // async openMessage({ commit, dispatch }: any, msg: any) {
    //   if (msg?.url) {
    //     const targetMenu = await dispatch('menus/checkPermission', msg.url, { root: true });
    //     if (targetMenu) {
    //       router.push(targetMenu.path).catch(() => {
    //         console.log(1)
    //       });
    //       dispatch('menus/navigate', targetMenu.path, { root: true });
    //       commit('addToReading', msg);
    //     }
    //   }
    // },
  },
};
