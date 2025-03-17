import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Check if the model exists before trying to access its properties
    const model = models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }

    // Ensure that model.db and model.db.db are defined
    if (!model.db || !model.db.db) {
      throw new Error(`Database connection for model ${modelName} is not defined`);
    }

    // Proceed with the rest of the code if the model and its db connection exist
    let modelExists = await model.db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
