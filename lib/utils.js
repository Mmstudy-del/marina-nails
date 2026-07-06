import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Create a new client
export const createClient = async (clientData) => {
  try {
    const clientId = uuidv4();
    const docRef = await addDoc(collection(db, 'clients'), {
      ...clientData,
      clientId,
      maintenanceCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, clientId, ...clientData };
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

// Get client by unique ID
export const getClientByUniqueId = async (clientId) => {
  try {
    const q = query(collection(db, 'clients'), where('clientId', '==', clientId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error getting client:', error);
    throw error;
  }
};

// Get all clients
export const getAllClients = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'clients'));
    const clients = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return clients;
  } catch (error) {
    console.error('Error getting clients:', error);
    throw error;
  }
};

// Add maintenance to client
export const addMaintenance = async (docId, maintenanceData) => {
  try {
    const clientRef = doc(db, 'clients', docId);
    const clientDoc = await getDoc(clientRef);
    const currentCount = clientDoc.data().maintenanceCount || 0;

    await updateDoc(clientRef, {
      maintenanceCount: currentCount + 1,
      updatedAt: Timestamp.now(),
    });

    return { success: true, newCount: currentCount + 1 };
  } catch (error) {
    console.error('Error adding maintenance:', error);
    throw error;
  }
};

// Calculate discount
export const calculateDiscount = (maintenanceCount) => {
  if (maintenanceCount >= 5 && maintenanceCount % 5 === 0) {
    return 50;
  }
  return 0;
};

// Get progress to next free service
export const getProgressToNextFree = (maintenanceCount) => {
  const cyclePosition = maintenanceCount % 5;
  const progress = (cyclePosition / 5) * 100;
  const nextFreeAt = 5 - cyclePosition;
  return { progress, nextFreeAt };
};
