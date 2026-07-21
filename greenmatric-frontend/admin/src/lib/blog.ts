import { db, storage } from "./firebase";
import {
  collection, query, orderBy, onSnapshot, doc, getDoc, addDoc, updateDoc,
  deleteDoc, serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Article } from "./types";

export { slugify } from "./text";

export function subscribeArticles(cb: (a: Article[]) => void) {
  const q = query(collection(db, "articles"), orderBy("updatedAt", "desc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Article) }))));
}

export async function getArticle(id: string): Promise<Article | null> {
  const s = await getDoc(doc(db, "articles", id));
  return s.exists() ? { id: s.id, ...(s.data() as Article) } : null;
}

export async function createArticle(authorUid: string): Promise<string> {
  const r = await addDoc(collection(db, "articles"), {
    title: "Untitled article",
    slug: `untitled-${Date.now()}`,
    body: "",
    excerpt: "",
    tags: [],
    status: "draft",
    authorUid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return r.id;
}

export async function saveArticle(id: string, patch: Partial<Article>) {
  await updateDoc(doc(db, "articles", id), { ...patch, updatedAt: serverTimestamp() });
}

export async function publishArticle(id: string) {
  await updateDoc(doc(db, "articles", id), { status: "published", publishedAt: serverTimestamp(), updatedAt: serverTimestamp() });
}

export async function unpublishArticle(id: string) {
  await updateDoc(doc(db, "articles", id), { status: "draft", updatedAt: serverTimestamp() });
}

export async function deleteArticle(id: string) {
  await deleteDoc(doc(db, "articles", id));
}

export async function uploadImage(articleId: string, file: File): Promise<string> {
  const path = `blog/${articleId}/${Date.now()}-${file.name}`;
  const r = ref(storage, path);
  await uploadBytes(r, file);
  return getDownloadURL(r);
}
