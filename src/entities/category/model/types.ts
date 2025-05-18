export type Category = {
  _id: string;
  name: string;
  userId: string;
};

export interface CreateCategoryRequest {
  name: string;
}
