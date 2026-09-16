import { jwtDecode } from "jwt-decode";
import { ResponseMangaResponseType } from "../api/model";

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<{ uid: string }>(token);
    return decoded.uid;
  } catch (error) {
    return null;
  }
}

export function defineContentTypeLabel(type: ResponseMangaResponseType) {
  switch (type) {
    case ResponseMangaResponseType.author_works:
      return "Muallif Asarlari";
    case ResponseMangaResponseType.manga:
      return "Manga";
    case ResponseMangaResponseType.manhwa:
      return "Manxva";
    case ResponseMangaResponseType.manhua:
      return "Manxua";
    case ResponseMangaResponseType.comics:
      return "Komiks";
    default:
      return type;
  }
}
