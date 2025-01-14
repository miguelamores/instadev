export const sidebarLinks = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore'
  },
  {
    imgURL: '/assets/icons/people.svg',
    route: '/all-users',
    label: 'People'
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved'
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create Post'
  }
]

export const bottombarLinks = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore'
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved'
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create'
  }
]

export const QUERY_KEYS = {
  GET_RECENT_POSTS: 'getRecentPosts',
  GET_CURRENT_USER: 'getCurrentUser',
  GET_POST_BY_ID: 'getPostById',
  SEARCH_POSTS: 'searchPosts',
  GET_SAVED_POSTS: 'getSavedPosts',
  SEARCH_USERS: 'searchUsers'
} as const
