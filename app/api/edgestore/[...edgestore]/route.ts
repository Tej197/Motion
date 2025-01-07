import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

// Initialize Edge Store
const es = initEdgeStore.create(); // No arguments are passed

// Check if initialization was successful
if (!es) {
  throw new Error('Failed to initialize Edge Store.');
}

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket()
    .beforeDelete(() => {
      return true; // Adjust deletion logic as needed
    }),
});

// Create the handler for Next.js API routes
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;