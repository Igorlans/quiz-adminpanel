import {
    collection,
    doc,
    getDoc,
    getDocs,
    where,
    query,
    addDoc,
    deleteDoc,
    writeBatch,
    orderBy,
} from "firebase/firestore";
import { db, storage } from "../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as generateId } from "uuid";
import { categoriesCollectionId, gamesCollectionId, questionsCollectionId } from "../config.js";

export class FirebaseService {
    collectionRef;
    collectionId;

    constructor(collectionId) {
        try {
            this.collectionId = collectionId;
            this.collectionRef = collection(db, collectionId);
        } catch (e) {
            throw e;
        }
    }

    async getOneById(id) {
        try {
            const docRef = doc(db, this.collectionId, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const docData = docSnap.data();
                return { id: docSnap.id, ...docData };
            } else {
                throw new Error("Документу не існує");
            }

            return doc.data();
        } catch (e) {
            throw e;
        }
    }

    getRef() {
        return this.collectionRef;
    }

    async getMany(options) {
        try {
            let q = this.collectionRef;

            // If queryArr exists, add the query condition to the query
            if (options?.where) {
                q = query(q, where(...options.where));
            }

            // If orderBy exists, add the sort order to the query
            if (options?.orderBy) {
                q = query(q, orderBy(...options.orderBy));
            }

            const data = await getDocs(q);

            const documents = data.docs.map((doc) => {
                const data = doc.data();
                return { id: doc.id, ...data };
            });

            // If joinOptions are provided and the joinField exists in the document,
            // fetch the document from the other collection and add it to the document
            if (options?.joinOptions && options.joinOptions.joinField) {
                const joinField = options.joinOptions.joinField;
                const joinService = options.joinOptions.joinService;

                for (const document of documents) {
                    if (document[joinField]) {
                        try {
                            const joinDocument = await joinService.getOneById(
                                document[joinField]
                            );
                            document[joinField] = joinDocument;
                        } catch (e) {
                            console.error(
                                `Error getting joined document: ${e.message}`
                            );
                        }
                    }
                }
            }

            return documents;
        } catch (e) {
            throw e;
        }
    }

    async create(data) {
        try {
            const docRef = await addDoc(this.collectionRef, data);
            return { id: docRef.id, ...data };
        } catch (e) {
            throw e;
        }
    }

    async delete(id) {
        try {
            const deletedDocRef = doc(db, this.collectionId, id);
            await deleteDoc(deletedDocRef);
        } catch (e) {
            throw e;
        }
    }

    async deleteMany(whereClause) {
        try {
            const q = query(this.collectionRef, where(...whereClause));
            const data = await getDocs(q);

            const batch = writeBatch(db);

            data.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
        } catch (e) {
            throw e;
        }
    }

    async createMany(arrayOfObj) {
        try {
            const batch = writeBatch(db);

            arrayOfObj?.map((obj) => {
                console.log('newQuestion', obj);
                const newDocRef = doc(this.collectionRef);
                batch.set(newDocRef, obj);
            });

            await batch.commit();
        } catch (e) {
            throw e;
        }
    }

}

export const uploadFile = async (file, path = '') => {
    try {
        if (!file?.name) throw new Error('Помилка завантаження')

        const fileExt = file.name?.split('.').pop();
        const fileName = `${generateId()}.${fileExt}`

        const fileRef = ref(storage, `${path}/${fileName}`)

        const metaData = {
            contentType: file.type,
        }

        await uploadBytes(fileRef, file, metaData);

        const fileUrl = await getDownloadURL(fileRef);

        return fileUrl;

    } catch (e) {
        throw e;
    }
}

export const QuestionsService = new FirebaseService(questionsCollectionId);
export const GamesService = new FirebaseService(gamesCollectionId);
export const CategoriesService = new FirebaseService(categoriesCollectionId);
