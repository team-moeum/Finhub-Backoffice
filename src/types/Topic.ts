export interface ITopic {
  id: number;
  title: string;
  thumbnailImgPath: string;
  categoryId: number;
  categoryName?: string;
  definition: string;
  useYN: string;
}
