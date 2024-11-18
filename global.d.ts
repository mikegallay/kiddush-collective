declare global {
    var _mongoClientPromise: Promise<MongoClient>;
  }
  
  export {}; // This makes the file a module and avoids global scope pollution
  