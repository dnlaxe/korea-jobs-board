import { appLogger } from "../../middleware/logger.js";
import { LivePostRow } from "../../types/types.js";

const TIME_TO_EXPIRY = 60_000;

interface LivePostsCache {
  posts: LivePostRow[];
  expiresAt: number;
}

let activePostsCache: LivePostsCache | null = null;

export function getCachedLivePosts() {
  if (!activePostsCache) return null;
  if (Date.now() > activePostsCache.expiresAt) {
    appLogger.info("Cache expired and emptied");
    activePostsCache = null;
    return null;
  }
  return activePostsCache.posts;
}

export function setCachedLivePosts(posts: LivePostRow[]) {
  activePostsCache = {
    posts,
    expiresAt: Date.now() + TIME_TO_EXPIRY,
  };
  appLogger.info(
    `New live post cache. ${activePostsCache.posts.length} jobs expire at ${new Date(
      activePostsCache.expiresAt,
    ).toLocaleString()}`,
  );
}

export function emptyLivePostCache() {
  activePostsCache = null;
  appLogger.info("Live post cache emptied");
}
