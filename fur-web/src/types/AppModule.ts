interface AppAssets {
  js: string[];
  css: string[];
}

interface AppView {
  title: string;
  path: string;
  html?: string;
  assets?: AppAssets;
}

export default interface AppModule {
  name: string;
  path?: string;
  authType: string;
  baseUrl: string;
  views?: AppView[];
}
