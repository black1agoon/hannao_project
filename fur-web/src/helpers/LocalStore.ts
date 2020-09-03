interface UserState {
  user: object;
  users: object;
  menus: object;
}

export default class LocalStore {
  public get(key: string) {
    const valueStr = window.localStorage.getItem(key);
    if (valueStr) {
      try {
        return JSON.parse(valueStr);
      } catch (e) {
        return valueStr;
      }
    }
    return valueStr;
  }

  public set(key: string, value: string | object) {
    const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, valueStr);
  }

  public save(key: string, value: string | object) {
    this.set(key, value);
  }

  public saveState({ user, users, menus }: UserState) {
    this.save('users', users);
    this.save('user', user);
    this.save('menus', menus);
  }

  public loadState() {
    return {
      user: this.get('user'),
      users: this.get('users'),
      menus: this.get('menus'),
    };
  }
}
