
declare global {
    namespace Express {
      interface Request {
        userId: number;
      }
    }
  }
  
  // You need at least one export or import in a global‑augmentation
  // file to make it a module; this import does nothing at runtime.
  export {};
  