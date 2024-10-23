declare namespace NodeJS {
    interface Global {
      mongoose: {
        conn: any; // or a more specific type
        promise: Promise<typeof import('mongoose')> | null;
      } | null;
    }
  }
  