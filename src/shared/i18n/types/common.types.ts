export interface CommonTranslationTypes {
  languageSwitcher: {
    title: string;
    russian: string;
    english: string;
  };
  themeSwitcher: {
    title: string;
    light: string;
    dark: string;
    system: string;
  };
  header: {
    profileNavigation: {
      title: string;
      myProfile: {
        title: string;
        description: string;
      };
      myFriends: {
        title: string;
        description: string;
      };
      myGroups: {
        title: string;
        description: string;
      };
      myChats: {
        title: string;
        description: string;
      };
    };
  };
  footer: {
    rights: string;
  };
}
